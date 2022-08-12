import { faker } from "@faker-js/faker";
import { usernames } from "./data.js";
import { randomIntFromInterval } from "./index.js";
const { date } = faker;

const gender = ["male", "female"];
const thisYear = new Date().getFullYear();

let timeSeriesData = [];

for (let i = 0; i < 100; i++) {
  let newDay = {
    createdAt: date.past(),
    username: usernames[i],
    age: thisYear - randomIntFromInterval(19, 70),
    gender: gender[randomIntFromInterval(0, 1)],
    code: "fakecode",
  };
  timeSeriesData.push(newDay);
}

export const userData = timeSeriesData;
