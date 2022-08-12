import * as commentRepository from "../../services/comment.js";
import { verifyToken } from "../functions/authentication.js";

export const postComment = async (req, res) => {
  /**
   * 기능: 댓글 작성
   * 작성자: 나수민
   */
  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const newComment = await commentRepository.createCommentTransaction(
      req.body.commentContent,
      req.params.postId,
      user.id,
      user.username
    );

    if (newComment) {
      const { postId, updatedAt, __v, ...commentInfo } = newComment.toObject();

      res.status(201).json({ data: commentInfo });
    } else res.sendStatus(500);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const patchComment = async (req, res) => {
  /**
   * 기능: 댓글 수정
   * 작성자: 나수민
   */
  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]); //access token 해독해서 사용할 예정
    const updatedComment = await commentRepository.modifyComment(
      user.id,
      req.params.commentId,
      req.body.commentContent
    );
    if (updatedComment) {
      res.json({
        message: "Comment modified!",
        data: {
          comment: updatedComment.contents,
        },
      });
    } else {
      res.status(500).json();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  /**
   * 기능: 댓글 삭제
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   */
  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);

    const deletedComment = await commentRepository.deleteCommentTransaction(
      user.id,
      req.params.commentId
    );

    if (deletedComment) res.status(204).json();
    else res.sendStatus(500);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getComments = async (req, res) => {
  /**
   * 기능: 댓글 목록 조회
   * 작성자: 나수민
   * 📌 시드 데이터 추가한 후 다시 성능 테스트 필요
   * 추후 수정을 위해 refer : https://stackoverflow.com/questions/28105009/implementing-pagination-in-mongodb
   */

  try {
    const user = req.headers["authorization"]
      ? verifyToken(req.headers["authorization"].split(" ")[1])
      : {}; //access token 해독해서 사용할 예정

    const commentList = await commentRepository.getCommentList(
      user.id,
      req.params.postId,
      req.query.sortby,
      req.query.page
    );

    if (commentList) {
      res.json({ data: commentList });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
