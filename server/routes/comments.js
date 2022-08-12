import express from "express";
import * as commentController from "../controllers/comments/comments.js";
import * as likeController from "../controllers/comments/likes.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/:postId", commentController.getComments);

router.post("/:postId", checkAuth, commentController.postComment);

router.patch("/:commentId", checkAuth, commentController.patchComment);

router.delete("/:commentId", checkAuth, commentController.deleteComment);

router.post("/likes/:commentId", checkAuth, likeController.postLike);

router.delete("/likes/:commentId", checkAuth, likeController.deleteLike);

export default router;
