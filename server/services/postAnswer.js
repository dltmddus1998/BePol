import Post from "../models/post.js";
import Post_answers from "../models/postAnswer.js";
import User from "../models/user.js";
import Post_statistics from "../models/postStatistics.js";
import mongoose from "mongoose";

export const getUserIdAnswered = async (userId, postId) => {
  return Post_answers.findOne({ userId, postId });
};

export const addAnswer = async (postId, userId, agree, session) => {
  return Post_answers.create(
    [
      {
        id: postId + userId,
        postId,
        userId,
        answer: agree,
      },
    ],
    { session }
  );
};

export const addAgrees = async (postId, session) => {
  return Post.findOne({ _id: postId }, { userId: false }).then(
    (post) => {
      post.agrees++;
      return post.save();
    },
    { session }
  );
};

export const addDisagrees = async (postId, session) => {
  return Post.findOne({ _id: postId }, { userId: false }).then(
    (post) => {
      post.disagrees++;
      return post.save();
    },
    { session }
  );
};

export const pushVoteStatistics = async (postId, userId, agree, session) => {
  const userData = await User.findOne({ _id: userId });
  const { gender, age } = userData;
  const thisYear = new Date().getFullYear();
  const thisYearAge = thisYear - age + 1;

  // 성별, 나이에 맞게 통계 입력
  const statisticData = await Post_statistics.findOne({ postId });
  if (!statisticData) {
    await Post_statistics.create({ postId });
  }
  return Post_statistics.findOne({ postId }).then(
    (stat) => {
      if (gender === "female") {
        // 여성
        if (thisYearAge < 20) {
          if (agree === true) {
            stat.female["10"].agrees++;
          } else {
            stat.female["10"].disagrees++;
          }
        }
        if (thisYearAge >= 20 && thisYearAge < 30) {
          if (agree === true) {
            stat.female["20"].agrees++;
          } else {
            stat.female["20"].disagrees++;
          }
        }
        if (thisYearAge >= 30 && thisYearAge < 40) {
          if (agree === true) {
            stat.female["30"].agrees++;
          } else {
            stat.female["30"].disagrees++;
          }
        }
        if (thisYearAge >= 40 && thisYearAge < 50) {
          if (agree === true) {
            stat.female["40"].agrees++;
          } else {
            stat.female["40"].disagrees++;
          }
        }
        if (thisYearAge >= 50 && thisYearAge < 60) {
          if (agree === true) {
            stat.female["50"].agrees++;
          } else {
            stat.female["50"].disagrees++;
          }
        }
        if (thisYearAge > 60) {
          if (agree === true) {
            stat.female["60"].agrees++;
          } else {
            stat.female["60"].disagrees++;
          }
        }
      } else if (gender === "male") {
        // 남성
        if (thisYearAge < 20) {
          if (agree === true) {
            stat.male["10"].agrees++;
          } else {
            stat.male["10"].disagrees++;
          }
        }
        if (thisYearAge >= 20 && thisYearAge < 30) {
          if (agree === true) {
            stat.male["20"].agrees++;
          } else {
            stat.male["20"].disagrees++;
          }
        }
        if (thisYearAge >= 30 && thisYearAge < 40) {
          if (agree === true) {
            stat.male["30"].agrees++;
          } else {
            stat.male["30"].disagrees++;
          }
        }
        if (thisYearAge >= 40 && thisYearAge < 50) {
          if (agree === true) {
            stat.male["40"].agrees++;
          } else {
            stat.male["40"].disagrees++;
          }
        }
        if (thisYearAge >= 50 && thisYearAge < 60) {
          if (agree === true) {
            stat.male["50"].agrees++;
          } else {
            stat.male["50"].disagrees++;
          }
        }
        if (thisYearAge > 60) {
          if (agree === true) {
            stat.male["60"].agrees++;
          } else {
            stat.male["60"].disagrees++;
          }
        }
      }
      stat.save();
    },
    { session }
  );
};

export const addAnswerTransaction = async (postId, userId, agree) => {
  /**
   * 투표 반영 -> Post, Post_answer
   */
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // 트랜잭션 시작

    const answer = await addAnswer(postId, userId, agree, session); // Post_answer 컬렉션에 도큐먼트 추가
    await (agree === true
      ? addAgrees(postId, session)
      : addDisagrees(postId, session)); // 찬성, 반대 여부에 맞게 Post 컬렉션 수정
    await pushVoteStatistics(postId, userId, agree, session); // 통계 결과 입력

    await session.commitTransaction();
    session.endSession();

    console.log("Transaction success!!");
    return answer;
  } catch (err) {
    console.error(err, "Transaction error!!!");
    await session.abortTransaction();
    session.endSession();
  }
};

export const findUserAnswer = async (userId) => {
  return Post_answers.findOne({ userId });
};

export const deleteAnswer = async (postId, userId, session) => {
  return Post_answers.deleteOne({ id: postId + userId }, { session });
};

export const substractAgrees = async (postId, session) => {
  return Post.findOne({ _id: postId }, { userId: false }).then(
    (post) => {
      if (post.agrees > 0) {
        post.agrees--;
        return post.save();
      }
    },
    { session }
  );
};

export const substractDisagrees = async (postId, session) => {
  return Post.findOne({ _id: postId }, { userId: false }).then(
    (post) => {
      if (post.disagrees > 0) {
        post.disagrees--;
        return post.save();
      }
    },
    { session }
  );
};

export const popVoteStatistics = async (postId, userId, agree, session) => {
  const userData = await User.findOne({ _id: userId });
  const { gender, age } = userData;
  const thisYear = new Date().getFullYear();
  const thisYearAge = thisYear - age + 1;

  // 성별, 나이에 맞게 통계 입력
  return Post_statistics.findOne({ postId }).then(
    (stat) => {
      if (gender === "XX") {
        // 여성
        if (thisYearAge < 20) {
          if (agree === true) {
            stat.female["10"].agrees--;
          } else {
            stat.female["10"].disagrees--;
          }
        }
        if (thisYearAge >= 20 && thisYearAge < 30) {
          if (agree === true) {
            stat.female["20"].agrees--;
          } else {
            stat.female["20"].disagrees--;
          }
        }
        if (thisYearAge >= 30 && thisYearAge < 40) {
          if (agree === true) {
            stat.female["30"].agrees--;
          } else {
            stat.female["30"].disagrees--;
          }
        }
        if (thisYearAge >= 40 && thisYearAge < 50) {
          if (agree === true) {
            stat.female["40"].agrees--;
          } else {
            stat.female["40"].disagrees--;
          }
        }
        if (thisYearAge >= 50 && thisYearAge < 60) {
          if (agree === true) {
            stat.female["50"].agrees--;
          } else {
            stat.female["50"].disagrees--;
          }
        }
        if (thisYearAge > 60) {
          if (agree === true) {
            stat.female["60"].agrees--;
          } else {
            stat.female["60"].disagrees--;
          }
        }
      } else {
        // 남성
        if (thisYearAge < 20) {
          if (agree === true) {
            stat.male["10"].agrees--;
          } else {
            stat.male["10"].disagrees--;
          }
        }
        if (thisYearAge >= 20 && thisYearAge < 30) {
          if (agree === true) {
            stat.male["20"].agrees--;
          } else {
            stat.male["20"].disagrees--;
          }
        }
        if (thisYearAge >= 30 && thisYearAge < 40) {
          if (agree === true) {
            stat.male["30"].agrees--;
          } else {
            stat.male["30"].disagrees--;
          }
        }
        if (thisYearAge >= 40 && thisYearAge < 50) {
          if (agree === true) {
            stat.male["40"].agrees--;
          } else {
            stat.male["40"].disagrees--;
          }
        }
        if (thisYearAge >= 50 && thisYearAge < 60) {
          if (agree === true) {
            stat.male["50"].agrees--;
          } else {
            stat.male["50"].disagrees--;
          }
        }
        if (thisYearAge > 60) {
          if (agree === true) {
            stat.male["60"].agrees--;
          } else {
            stat.male["60"].disagrees--;
          }
        }
      }
      stat.save();
    },
    { session }
  );
};

export const deleteAnswerTransaction = async (postId, userId, answer) => {
  /**
   * 투표 취소 반영 -> Post, Post_answer
   */
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // 트랜잭션 시작

    await deleteAnswer(postId, userId, session); // Post_answer 컬렉션에서 해당 도큐먼트 삭제
    await (answer === true
      ? substractAgrees(postId, session)
      : substractDisagrees(postId, session)); // Post 컬렉션에서 찬성 반대 여부에 맞게 수정
    await popVoteStatistics(postId, userId, answer, session); // 통계 결과 입력

    await session.commitTransaction();
    session.endSession();

    console.log("Transaction success!!");
    return "success";
  } catch (err) {
    console.error(err, "Transaction error!!");
    await session.abortTransaction();
    session.endSession();
  }
};

export const getPostStatistics = async (postId) => {
  // 통계 조회
  try {
    const record = await Post_statistics.findOne(
      { postId },
      { _id: 0, postId: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return record;
  } catch (err) {}
};
