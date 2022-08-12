"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.Object,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.Object,
    required: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
});

const Post_answers = mongoose.model("Post_answers", newSchema);

export default Post_answers;