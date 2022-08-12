import * as commentLikeRepository from "../../services/commentLike.js";
import { verifyToken } from "../functions/authentication.js";

export const postLike = async (req, res) => {
  /**
   * 기능: 댓글 공감
   * 작성자: 나수민
   * 트랜잭션 처리
   */

  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const commentLike = await commentLikeRepository.getCommentLike(
      req.params.commentId,
      user.id
    );

    if (!commentLike) {
      const updatedComment = await commentLikeRepository.commentLikeTransaction(
        req.params.commentId,
        user.id
      );

      if (updatedComment)
        res.status(201).json({ likesCount: updatedComment.likes });
      else res.sendStatus(500);
    } else res.status(409).json({ message: "You already liked the comment" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const deleteLike = async (req, res) => {
  /**
   * 기능: 댓글 공감 취소
   * 작성자: 나수민
   * 트랜잭션 처리
   */
  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const updatedComment =
      await commentLikeRepository.commentLikeCancelTransaction(
        req.params.commentId,
        user.id
      );

    if (updatedComment) res.sendStatus(204);
    else res.sendStatus(500);
  } catch {
    res.sendStatus(500);
  }
};
