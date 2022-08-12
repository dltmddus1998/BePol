"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    male: {
      10: {
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
      },
      20: {
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
      },
      30: {
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
      },
      40: {
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
      },
      50: {
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
      },
      60: {
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
      },
    },
    female: {
      10: {
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
      },
      20: {
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
      },
      30: {
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
      },
      40: {
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
      },
      50: {
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
      },
      60: {
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
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Post_statistics = mongoose.model("Post_statistics", newSchema);
export default Post_statistics;
