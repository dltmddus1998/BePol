import { MongoClient } from "mongodb";
import config from "../config/config.js";
import { userData } from "./user.js";
import { postData } from "./post.js";
import { commentData } from "./comment.js";
import { postAnswerData } from "./postAnswer.js";
import { postStatisticsData } from "./postStatistics.js";
import { hotPostData } from "./hotPost.js";

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB(collectionName, timeSeriesData) {
  // Connection URL
  const uri = config.database.url;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("test").collection(collectionName);

    await collection.drop();

    await collection.insertMany(timeSeriesData);

    console.log("Database seeded! :)");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB("users", userData);
seedDB("posts", postData);
seedDB("comments", commentData);
seedDB("hot_posts", hotPostData);
seedDB("post_answers", postAnswerData);
seedDB("post_statistics", postStatisticsData);
