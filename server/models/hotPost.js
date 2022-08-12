"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    agrees: {
      type: Number,
      required: true,
    },
    disagrees: {
      type: Number,
      required: true,
    },
    comments: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Hot_posts = mongoose.model("Hot_posts", newSchema);
export default Hot_posts;
