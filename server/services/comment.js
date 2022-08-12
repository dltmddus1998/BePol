import mongoose from "mongoose";
import Comment from "../models/comment.js";
import PostAnswer from "../models/postAnswer.js";
import Post from "../models/post.js";
import * as commentLikeRepository from "./commentLike.js";

export const createCommentTransaction = async (
  contents,
  postId,
  userId,
  username
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newComment = await Comment.create(
      [{ contents, postId, userId, username }],
      { session }
    );

    await Post.findByIdAndUpdate(
      postId,
      { $inc: { comments: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newComment[0];
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
  }
};

export const modifyComment = async (userId, commentId, contents) => {
  try {
    const comment = await Comment.findOne({ _id: commentId, userId });

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, userId },
      { contents },
      { new: true }
    );
    return updatedComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteCommentTransaction = async (userId, commentId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      userId: userId,
    });

    await Post.findByIdAndUpdate(
      deletedComment.postId,
      { $inc: { comments: -1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return deletedComment;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
  }
};

export const getCommentList = async (userId, postId, sortby, page) => {
  try {
    const pageSize = 10;
    const sortOptions = sortby === "likes" ? { likes: -1 } : { createdAt: -1 };

    const comments = await Comment.find({ postId }).sort(sortOptions);

    const commentList = comments.slice(
      pageSize * (Number(page ? page : 1) - 1),
      pageSize * (Number(page ? page : 1) - 1) + pageSize
    );

    if (!userId) {
      return Promise.all(
        commentList.map(async (comment) => {
          const postAnswer = await PostAnswer.findOne({
            id: postId + comment.userId,
          });
          return {
            ...comment.toObject(),
            answer: postAnswer ? postAnswer.answer : undefined,
          };
        })
      );
    }

    return Promise.all(
      commentList.map(async (comment) => {
        const commentLike = await commentLikeRepository.getCommentLike(
          comment._id,
          userId
        );
        const postAnswer = await PostAnswer.findOne({
          id: postId + comment.userId,
        });

        return {
          ...comment.toObject(),
          isliked: commentLike ? true : false,
          answer: postAnswer ? postAnswer.answer : undefined,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }
};
