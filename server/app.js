import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDb from "./db/database.js";
import config from "./config/config.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comments.js";
import cron from "node-cron";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketServer } from "./controllers/socket.js";
import fsExtra from "fs-extra";
import * as sendMailStatusRepository from "./services/sendMailStats.js";
import * as postRepsitory from "./services/post.js";
dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server);
io.on("connection", (socket) => socketServer(socket, io));

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
    origin: "*",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("tiny"));

app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.use("/", (req, res, next) => {
  res.send("API Server!!");
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = config.port || 4000;
connectDb();

server.listen(port, () => {
  console.log(`SERVER Started on ${port} port`);
});

// hot3 게시판 매일 23시 59분에 업데이트 자동화 설정
cron.schedule("59 23 1-31 * *", async () => {
  await postRepsitory.setThreePopularPosts();
});

// 투표 현황 메일 - 매일 오전 9시
cron.schedule("59 8 1-31 * *", async () => {
  await sendMailStatusRepository.sendMailStats();
});

// 메일 보낸 후 imgs 폴더 비워주기
cron.schedule("59 9 1-31 * *", async () => {
  fsExtra.emptyDirSync("imgs/");
});
