import * as postAnswerRepository from "../../services/postAnswer.js";
import { verifyToken } from "../functions/authentication.js";

export const voteToPost = async (req, res) => {
  /**
   * 기능: 발의문 찬반투표 & 투표 취소 기능
   * 작성자: 이승연
   * 📌 투표 기능 ✔︎
   * 📌 게시물 agrees, disagrees 반영 ✔︎
   * 📌 예외 처리 - unauthorized user, 이미 투표한 사람 ✔︎
   * 📌 유저 정보에 맞게 통계 적용 ✔︎
   * 📌 통계 정보에 적용 ✔︎
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 📌 트랜잭션 처리 ✔︎
   */

  /**
   * agree === false -> 반대
   * agree === true -> 찬성
   */
  try {
    const { agree } = req.body;
    const { postId } = req.params;
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const votedUser = await postAnswerRepository.getUserIdAnswered(user.id);
    if (votedUser) {
      // 이미 투표한 경우
      return res.status(403).json({
        message: "Already voted user!",
      });
    } else {
      const data = await postAnswerRepository.addAnswerTransaction(
        postId,
        user.id,
        agree
      );

      if (!data) {
        return res.status(500).json({
          message: "Server Error!",
        });
      } else {
        return res.status(201).json({
          message: "Voted successfully",
          agree: data[0].answer,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};

export const voteDeleteToPost = async (req, res) => {
  /**
   * 기능: 찬반투표 취소
   * 작성자: 이승연
   * 📌 투표 취소 기능 ✔︎
   * 📌 게시물 agrees, disagrees 반영 ✔︎
   * 📌 예외 처리 - unauthorized user, postAnser 컬렉션에 해당 유저가 없는 사람 (투표 안함) ✔︎
   * 📌 유저 정보에 맞게 통계 적용 ✔︎
   * 📌 통계 정보에 적용 ✔︎
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 📌 트랜잭션 처리 ✔︎
   */

  /**
   * 해당 유저의 투표 기록을 취소
   * 1. postAnswer에서 해당 유저아이디에 일치하는 answer값 가져오기
   * 2. 이 answer값을 지우는것
   */

  try {
    const { postId } = req.params;
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const userPostAnswer = await postAnswerRepository.findUserAnswer(user.id);
    const votedUser = await postAnswerRepository.getUserIdAnswered(
      user.id,
      postId
    );
    if (!votedUser) {
      // 투표 안한 경우
      return res.status(403).json({
        message: "No vote record of this user!!",
      });
    } else {
      const data = await postAnswerRepository.deleteAnswerTransaction(
        postId,
        user.id,
        userPostAnswer.answer
      );

      if (!data) {
        return res.status(500).json({
          message: "Server Error!",
        });
      } else {
        return res.status(200).json({
          message: "Vote is deleted!!",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};
