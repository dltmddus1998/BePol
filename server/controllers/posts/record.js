import * as postAnswerRepository from "../../services/postAnswer.js";

export const getVoteStatistics = async (req, res) => {
  /**
   * 기능: 통계 결과 조회
   * 작성자: 이승연
   * 📌 통계 조회 기능 ✔︎
   * postId에 있는 통계 찾아서 조회
   */
  const { postId } = req.params;
  try {
    // Post_statistics에서 postId에 맞는 데이터 전체 조회
    const data = await postAnswerRepository.getPostStatistics(postId);

    if (!data) {
      return res.status(404).json({
        message: "This post doesn't exist",
      });
    } else {
      return res.status(200).json({
        data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};
