import { mongoose } from "mongoose";
import { userId, postId } from "./data.js";
import { randomIntFromInterval } from "./index.js";

let timeSeriesData = [];

for (let i = 40; i > 0; i--) {
  let newDay = {
    id: postId[0] + userId[i],
    postId: mongoose.Types.ObjectId(postId[0]),
    userId: mongoose.Types.ObjectId(userId[i]),
    answer: !randomIntFromInterval(0, 1),
  };
  timeSeriesData.push(newDay);
}
for (let i = 21; i > 0; i--) {
  let newDay = {
    id: postId[1] + userId[i],
    postId: mongoose.Types.ObjectId(postId[1]),
    userId: mongoose.Types.ObjectId(userId[i]),
    answer: randomIntFromInterval(0, 1),
  };
  timeSeriesData.push(newDay);
}
for (let i = 15; i > 0; i--) {
  let newDay = {
    id: postId[2] + userId[i],
    postId: mongoose.Types.ObjectId(postId[2]),
    userId: mongoose.Types.ObjectId(userId[i]),
    answer: randomIntFromInterval(0, 1),
  };
  timeSeriesData.push(newDay);
}

export const postAnswerData = timeSeriesData;
