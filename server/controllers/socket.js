import Comment from "../models/comment.js";
import * as postRepository from "../services/post.js";

export const socketServer = (socket, io) => {
  socket.on("userId", (userId) => {
    socket.data.userId = userId;
  });

  socket.on("disconnect", () => {
    console.log("소켓 해제");
  });

  let changeStream;
  try {
    changeStream = Comment.watch();

    changeStream.on("change", async (next) => {
      switch (next.operationType) {
        case "insert":
          const post = await postRepository.getPost(next.fullDocument.postId);
          const userIdToNotify = post.userId.toString();

          if (socket.data.userId === userIdToNotify) {
            console.log(post.title);
            socket.emit("newComment", post._id, post.title);
          }

          break;
      }
    });
  } catch (err) {}
};
