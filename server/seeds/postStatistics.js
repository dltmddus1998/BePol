import { mongoose } from "mongoose";
import { postId } from "./data.js";

export const postStatisticsData = [
  {
    postId: mongoose.Types.ObjectId(postId[0]),
    male: {
      10: {
        agrees: 2,
        disagrees: 8,
      },
      20: {
        agrees: 10,
        disagrees: 6,
      },
      30: {
        agrees: 3,
        disagrees: 7,
      },
      40: {
        agrees: 11,
        disagrees: 2,
      },
      50: {
        agrees: 12,
        disagrees: 5,
      },
      60: {
        agrees: 5,
        disagrees: 6,
      },
    },
    female: {
      10: {
        agrees: 4,
        disagrees: 6,
      },
      20: {
        agrees: 1,
        disagrees: 9,
      },
      30: {
        agrees: 3,
        disagrees: 7,
      },
      40: {
        agrees: 10,
        disagrees: 2,
      },
      50: {
        agrees: 11,
        disagrees: 2,
      },
      60: {
        agrees: 2,
        disagrees: 1,
      },
    },
  },
  {
    postId: mongoose.Types.ObjectId(postId[1]),
    male: {
      10: {
        agrees: 11,
        disagrees: 8,
      },
      20: {
        agrees: 22,
        disagrees: 11,
      },
      30: {
        agrees: 3,
        disagrees: 5,
      },
      40: {
        agrees: 2,
        disagrees: 6,
      },
      50: {
        agrees: 13,
        disagrees: 3,
      },
      60: {
        agrees: 0,
        disagrees: 0,
      },
    },
    female: {
      10: {
        agrees: 1,
        disagrees: 3,
      },
      20: {
        agrees: 5,
        disagrees: 7,
      },
      30: {
        agrees: 4,
        disagrees: 6,
      },
      40: {
        agrees: 3,
        disagrees: 4,
      },
      50: {
        agrees: 11,
        disagrees: 4,
      },
      60: {
        agrees: 3,
        disagrees: 6,
      },
    },
  },
  {
    postId: mongoose.Types.ObjectId(postId[2]),
    male: {
      10: {
        agrees: 3,
        disagrees: 8,
      },
      20: {
        agrees: 2,
        disagrees: 7,
      },
      30: {
        agrees: 6,
        disagrees: 2,
      },
      40: {
        agrees: 4,
        disagrees: 1,
      },
      50: {
        agrees: 5,
        disagrees: 5,
      },
      60: {
        agrees: 3,
        disagrees: 7,
      },
    },
    female: {
      10: {
        agrees: 3,
        disagrees: 2,
      },
      20: {
        agrees: 8,
        disagrees: 4,
      },
      30: {
        agrees: 5,
        disagrees: 1,
      },
      40: {
        agrees: 6,
        disagrees: 3,
      },
      50: {
        agrees: 3,
        disagrees: 2,
      },
      60: {
        agrees: 1,
        disagrees: 2,
      },
    },
  },
];
