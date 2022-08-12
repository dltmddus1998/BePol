import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
    name: "bepol",
    options: {
      useNewUrlParser: true,
    },
  },
};
