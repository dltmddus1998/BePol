import mongoose from "mongoose";
import Post from "../models/post.js";
import Hot_posts from "../models/hotPost.js";
import PostAnswer from "../models/postAnswer.js";
import { deleteS3File } from "../controllers/functions/file.js";

const EXCEPT_OPTION = {
  purport: 0,
  contents: 0,
  attachments: 0,
  sendEmailStatus: 0,
}; // 필요없는 컬럼 삭제하기 위한 변수

const setSortOptions = async (sortby) => {
  // sortby 조건에 따라 옵션 설정
  try {
    let sortOptions;
    if (sortby === "최신순") {
      sortOptions = { createdAt: -1 };
    } else if (sortby === "마감임박순") {
      sortOptions = { createdAt: 1 };
    } else if (sortby === "찬성순") {
      sortOptions = { agrees: -1 };
    } else if (sortby === "반대순") {
      sortOptions = { disagrees: -1 };
    }

    return sortOptions;
  } catch (err) {
    console.log(err);
  }
};

const getPostsList = async (page, search, sortOptions, pageSize) => {
  // Post.find() 함수 선언
  try {
    return Post.find(
      {
        title: {
          $regex: search,
        },
      },
      EXCEPT_OPTION
    )
      .sort(sortOptions)
      .skip(pageSize * (Number(page ? page : 1) - 1))
      .limit(pageSize)
      .exec();
  } catch (err) {
    console.log(err);
  }
};

const getByCategory = async (postsList, categoryArr, search) => {
  // 카테고리 검색 함수 선언
  try {
    return Promise.all(
      postsList.map(async (post) => {
        let posts;
        const { category } = post;
        for (let type of category) {
          for (let category of categoryArr) {
            if (type === category) {
              posts = await Post.find(
                {
                  title: {
                    $regex: search,
                  },
                  category: {
                    $in: type,
                  },
                },
                EXCEPT_OPTION
              );
              return posts;
            } else {
              continue;
            }
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const getClosed = async (postsList, posts, openedPosts) => {
  // 마감된 발의문 분류 함수 선언
  try {
    return Promise.all(
      postsList.map(async (post) => {
        const { createdAt } = post;
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const afterOneMonth = new Date(year, month + 1, day);

        afterOneMonth.getTime() < new Date().getTime()
          ? posts.push(post)
          : openedPosts.push(post);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllByCategory = async (categoryArr, search, sortby, page) => {
  try {
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    const listWithCategory = await getByCategory(
      postsList,
      categoryArr,
      search
    );
    const filteredList = listWithCategory.filter(
      (el) => el !== false && el !== undefined
    );
    return filteredList;
  } catch (err) {
    console.log(err);
  }
};

export const getClosedAllByCategory = async (
  categoryArr,
  search,
  sortby,
  page
) => {
  try {
    const posts = [];
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    const listWithCategory = await getByCategory(postsList, categoryArr);
    const filteredList = listWithCategory.filter(
      (el) => el !== false && el !== undefined
    );
    await getClosed(filteredList[0], posts, []);

    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchedTitleBySorting = async (search, sortby, page) => {
  try {
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);

    return await getPostsList(page, search, sortOptions, pageSize);
  } catch (err) {
    console.log(err);
  }
};

export const getClosedSearchedTitleBySorting = async (search, sortby, page) => {
  try {
    const posts = [];
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    await getClosed(postsList, posts, []);

    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const getDday = (data, dDayList) => {
  data.forEach((post) => {
    const { _id, createdAt, postId } = post;

    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const dDay = new Date(year, month + 1, day);
    const today = new Date();
    // if (dDay.getTime() > new Date().getTime()) {
    const diff = Math.floor((dDay - today) / (1000 * 60 * 60 * 24));
    postId
      ? dDayList.push({ postId, dDay: diff })
      : dDayList.push({ postId: _id, dDay: diff });
    // }
  });
};

export const createPost = async (
  userId,
  username,
  title,
  category,
  purport,
  contents,
  files
) => {
  const attachments = files.map((file) => {
    return {
      fileName: file.key,
      filePath: file.location,
    };
  });
  try {
    const newPost = await Post.create({
      username,
      title,
      category,
      purport,
      contents,
      userId: userId,
      attachments,
    });

    return newPost;
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (postId) => {
  try {
    return await Post.findById(postId);
  } catch (err) {}
};

export const getPostAnswer = async (postId, userId) => {
  try {
    const answer = await PostAnswer.findOne({
      id: postId + userId,
    });
    if (answer) {
      return answer.answer;
    }
  } catch {}
};

export const getFileName = async (postId, fileIndex) => {
  try {
    const post = await getPost(postId);
    if (post.attachments[fileIndex])
      return post.attachments[fileIndex].fileName;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (userId, postId) => {
  try {
    const postToDelete = await Post.findOne({
      userId: userId,
      _id: postId,
    });

    if (postToDelete) {
      if (postToDelete.attachments) {
        postToDelete.attachments.map((file) => {
          deleteS3File(file.fileName);
        });
      }
    }

    const deletedPost = await Post.deleteOne({ _id: postToDelete._id });

    return deletedPost;
  } catch (err) {
    console.log(err);
  }
};

export const setThreePopularPosts = async () => {
  try {
    const allPosts = await Post.find(
      {},
      {
        purport: 0,
        contents: 0,
        attachments: 0,
        sendEmailStatus: 0,
        category: 0,
        username: 0,
      }
    );
    let hotPosts = [];
    let openedPosts = [];

    await getClosed(allPosts, [], openedPosts);

    Promise.all(
      openedPosts.map(async (post) => {
        const { agrees, disagrees } = post;
        // 찬반 비율 차이 구하기 Math.abs
        const agreesProportion = (
          parseFloat(agrees / (agrees + disagrees)) * 100
        ).toFixed(3);
        const disagreesProportion = parseFloat(100 - agreesProportion).toFixed(
          3
        );

        if (
          Math.abs(agreesProportion - disagreesProportion) < 10 &&
          agrees + disagrees > 50
        ) {
          if (hotPosts.length < 3) {
            hotPosts.push(post);
          } else {
            return;
          }
        }
      })
    );

    return Promise.all(
      hotPosts.map(async (post) => {
        const { _id, title, agrees, disagrees, comments, createdAt } = post;
        await Hot_posts.deleteMany();

        return await Hot_posts.create({
          postId: _id,
          title,
          agrees,
          disagrees,
          comments,
          createdAt,
        });
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const getThreePopularPosts = async () => {
  try {
    const hotPosts = await Hot_posts.find({});
    const voteDESC = [];
    let flag = false;

    hotPosts.map((post) => {
      const { agrees, disagrees } = post;
      const voteCnt = agrees + disagrees;
      voteDESC.push(voteCnt);
    });

    for (let i = voteDESC.length; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (voteDESC[j] < voteDESC[j + 1]) {
          let tmp = hotPosts[j];
          hotPosts[j] = hotPosts[j + 1];
          hotPosts[j + 1] = tmp;
          flag = true;
        }
      }
      if (!flag) {
        break;
      }
      voteDESC.length--;
    }

    return hotPosts;
  } catch (err) {
    console.log(err);
  }
};
