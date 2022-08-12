"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    postId: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Comments = mongoose.model("Comments", newSchema);
export default Comments;
