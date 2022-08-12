import Post from "../models/post.js";
import User from "../models/user.js";
import { transport } from "../config/mail.transport.js";
import puppeteer from "puppeteer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const { sendEmailUser, PORT, captureStatsClient } = process.env;

export const sendMailStats = async () => {
  /**
   * 기능: 투표 현황 이메일 전송 기능
   * 작성자: 이승연
   * 📌 발의문 마감 임박일에 투표 현황 리포트 이메일로 전송 (client화면) ✔︎
   * 📌 통계 client부분 완성되면 제대로 연결 🔺
   * 📌 node-mailer로 이메일 전송 기능 구현 ✔︎
   * 📌 node-mailer 파일 첨부 및 Embedded 이미지 구현 ✔︎
   * 📌 트랜잭션 처리 (sendEmailStatus 상태변화 & 이메일 전송) ✔︎
   */

  /** Logic
   * 1. 발의문들 중 마감이 하루 남은 것들 필터링 (마감 안된걸로) ✔︎
   * 2. 해당 발의문의 작성자 이메일 찾기 (User collection) ✔︎
   * 3. 해당 발의문 투표 통계 페이지 (client) 캡쳐 기능 - puppeteer 사용 ✔︎
   * 4. 캡쳐한 화면을 node-mailer에서 attachment 옵션으로 보내기 ✔︎
   * 5. 중복메일이 가지 않도록 Post 컬렉션의 sendEmailStatus가 false일 때만 메일가게 설정 ✔︎
   * 6. 메일 전송 후 imgs폴더의 사진들은 삭제하기 ✔︎ (app.js)
   *
   */
  try {
    let thirtyPercentOverPosts = [];
    const postsList = await Post.find(
      {},
      {
        _id: 1,
        username: 1,
        title: 1,
        agrees: 1,
        disagrees: 1,
        userId: 1,
        createdAt: 1,
        sendEmailStatus: 1,
      }
    );
    for (let post of postsList) {
      const { createdAt } = post;
      const date = new Date(createdAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const afterOneMonth = new Date(year, month + 1, day);
      const oneDayBeforeEnd = new Date(year, month + 1, day - 1);

      if (
        oneDayBeforeEnd.toLocaleDateString() ===
          new Date().toLocaleDateString() &&
        afterOneMonth.getTime() > new Date().getTime()
      ) {
        // 마감되지 않은 발의문 중 마감 하루 남은 발의문 리스트 filtering
        thirtyPercentOverPosts.push(post);
      }
    }

    Promise.all(
      thirtyPercentOverPosts.map(async (post) => {
        const { _id, userId, title, sendEmailStatus } = post;

        const userData = await User.findOne({ _id: userId });
        const fileName = fs.existsSync(`./imgs/stats${_id}.png`);
        if (userData) {
          const { username, email } = userData;

          const emailOptions = {
            from: sendEmailUser,
            to: email,
            subject: `안녕하세요. BePol입니다.`,
            html: `${username}님이 작성하신 ${title}에 관한 투표가 내일 마감됩니다. 
                <br><br>
                <br><br>
                <a href=http://localhost:3000/detail/${_id}> 바로 가기 링크 </a>
                <br>
                <br>
                <img src="cid:stats">
              `,
            attachments: [
              {
                filename: "stats.png",
                path: `imgs/stats${_id}.png`,
                cid: "stats",
              },
            ],
          };

          if (fileName && sendEmailStatus === false && email) {
            Post.updateOne({ _id }, { sendEmailStatus: true })
              .then(async () => {
                transport.sendMail(emailOptions); // updateOne에 오류가 생기지 않을때만 메일이 보내지도록 처리
              })
              .then(async () => {
                console.log(
                  `Emails are sent in ${new Date().toLocaleDateString()}`
                );
              })
              .catch(async (err) => {
                console.log(err);
              });
          } else if (!fileName && sendEmailStatus === false && email) {
            puppeteer.launch().then(async (browser) => {
              return browser.newPage().then(async (page) => {
                return page
                  .goto(`http://localhost:3000/${captureStatsClient}/${_id}`)
                  .then(async () => {
                    await page.screenshot({
                      fullPage: true, // 전체페이지 캡쳐 옵션
                      path: `imgs/stats${_id}.png`, // 캡쳐본 파일명
                    });
                  })
                  .then(() => browser.close())
                  .then(async () => {
                    await Post.updateOne({ _id }, { sendEmailStatus: true });
                  })
                  .then(async () => {
                    transport.sendMail(emailOptions); // updateOne에 오류가 생기지 않을때만 메일이 보내지도록 처리
                  })
                  .then(async () => {
                    console.log(
                      `Emails are sent in ${new Date().toLocaleDateString()}`
                    );
                  })
                  .catch(async (err) => {
                    console.log(err);
                  });
              });
            });
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};
