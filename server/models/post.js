"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      default: [],
    },
    purport: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    attachments: {
      type: Array,
      default: [],
    },
    agrees: {
      type: Number,
      default: 0,
      required: true,
    },
    disagrees: {
      type: Number,
      default: 0,
      required: true,
    },
    comments: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sendEmailStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Posts = mongoose.model("Posts", newSchema);
export default Posts;
