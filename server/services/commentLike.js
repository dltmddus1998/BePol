import mongoose from "mongoose";
import CommentLike from "../models/commentLike.js";
import Comment from "../models/comment.js";

export const getCommentLike = async (commentId, userId) => {
  const commentLike = await CommentLike.findOne({
    id: commentId + userId,
  });

  return commentLike;
};

export const commentLikeTransaction = async (commentId, userId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true, session: session }
    );

    await CommentLike.create(
      [
        {
          id: commentId + userId,
          commentId: mongoose.Types.ObjectId(commentId),
          userId: mongoose.Types.ObjectId(userId),
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return updatedComment;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
  }
};

export const commentLikeCancelTransaction = async (commentId, userId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: -1 } },
      { new: true, session: session }
    );

    const deleted = await CommentLike.findOneAndDelete(
      { id: commentId + userId },
      { session }
    );

    if (!deleted || !updatedComment) throw new Error("no such doc");

    await session.commitTransaction();
    session.endSession();

    return updatedComment;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
  }
};
