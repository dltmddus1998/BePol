import { faker } from "@faker-js/faker";
import { mongoose } from "mongoose";
import { usernames, userId, postId } from "./data.js";
const { date } = faker;

let timeSeriesData = [];

for (let i = 0; i < 100; i++) {
  let newDay = {
    username: usernames[i],
    userId: mongoose.Types.ObjectId(userId[i]),
    title: "건설근로자의 고용개선 등에 관한 법률 개선",
    category: ["법률 사법", "기타", "환경 성평등 청소년 노동"],
    purport:
      "현행 「건설근로자의 고용개선 등에 관한 법률」에 따르면 대통령령으로 정하는 규모 이상의 건설공사가 시행되는 현장에 화장실ㆍ식당ㆍ탈의실 등의 시설을 설치하도록 되어있고, 이 시설은 현장으로부터 300m 이내에 설치하도록 되어 있음. 아파트 등 고층 건물 현장에서 용무가 급한 근로자가 화장실을 이용하기 위해서는 공사용 엘리베이터를 타고 내려와서 화장실을 이용하고 다시 올라가야 하는데, 공사용 엘리베이터는 건설에 필요한 물품 등을 운반하느라 이용자가 많고 느리다 보니 많은 근로자가 공사 현장에서 용변을 보고 시멘트로 덮어버림. 이는 아파트 등 고층 건물의 위생은 물론이고 안전에도 큰 문제가 될 수 있음.",
    contents:
      "근로자들이 편하게 화장실을 이용할 수 있도록, 화장실을 5층당 한 개 이상 설치하도록 하고자 함",
    attachments: [],
    agrees: 0,
    disagrees: 0,
    comments: 0,
    sendEmailStatus: true,
    createdAt: date.past(),
  };
  timeSeriesData.push(newDay);
}

let dummy = [
  {
    _id: mongoose.Types.ObjectId(postId[0]),
    username: usernames[0],
    userId: mongoose.Types.ObjectId(userId[0]),
    title: "학교 급식에 관한 법률 개선",
    category: ["법률 사법", "기타", "환경 성평등 청소년 노동"],
    purport:
      "급식경비를 국가예산으로 지원하고 있음에도 법률상 급식경비 중 급식운영비에 대해 보호자부담이 가능하도록 규정되어 있어 이를 개정할 필요성이 있음",
    contents:
      "광역자치단체의 학교급식지원센터 설치ㆍ운영을 의무화하고, 학교급식에 필요한 급식시설ㆍ설비비ㆍ급식운영비를 해당 학교의 설립ㆍ경영자가 부담하되, 국가 또는 지방자치단체가 지원할 수 있도록 하려는 것임",
    attachments: [],
    agrees: 74,
    disagrees: 61,
    comments: 40,
    sendEmailStatus: true,
    createdAt: new Date(),
  },
  {
    _id: mongoose.Types.ObjectId(postId[1]),
    username: usernames[0],
    userId: mongoose.Types.ObjectId(userId[0]),
    title: "청소년복지 법률 개선",
    category: ["법률 사법", "기타", "환경 성평등 청소년 노동"],
    purport:
      "현행법은 여성가족부장관으로 하여금 청소년복지 향상을 위한 정책수립에 활용하기 위하여 3년마다 청소년의 의식ㆍ태도ㆍ생활 등에 관한 실태조사를 실시하도록 하고 있음. 그런데 현행법은 청소년부모에 대하여 가족지원서비스, 복지지원, 교육지원, 직업체험 및 취업지원에 관하여 규정하고 있으나, 이들에 대한 구체적인 실태를 파악하는 데 한계가 있어 체계적인 보호와 지원이 미흡하다는 지적이 있음.",
    contents:
      "청소년부모 지원을 위한 정책수립에 활용하기 위하여 청소년부모에 대하여 구체적인 실태를 파악할 수 있도록 명시적인 법적 근거를 마련하고자 함",
    attachments: [],
    agrees: 78,
    disagrees: 63,
    comments: 21,
    sendEmailStatus: true,
    createdAt: new Date(),
  },
  {
    _id: mongoose.Types.ObjectId(postId[2]),
    username: usernames[0],
    userId: mongoose.Types.ObjectId(userId[0]),
    title: "건설근로자의 고용개선 등에 관한 법률 개선",
    category: ["법률 사법", "기타", "환경 성평등 청소년 노동"],
    purport:
      "현행 「건설근로자의 고용개선 등에 관한 법률」에 따르면 대통령령으로 정하는 규모 이상의 건설공사가 시행되는 현장에 화장실ㆍ식당ㆍ탈의실 등의 시설을 설치하도록 되어있고, 이 시설은 현장으로부터 300m 이내에 설치하도록 되어 있음. 아파트 등 고층 건물 현장에서 용무가 급한 근로자가 화장실을 이용하기 위해서는 공사용 엘리베이터를 타고 내려와서 화장실을 이용하고 다시 올라가야 하는데, 공사용 엘리베이터는 건설에 필요한 물품 등을 운반하느라 이용자가 많고 느리다 보니 많은 근로자가 공사 현장에서 용변을 보고 시멘트로 덮어버림. 이는 아파트 등 고층 건물의 위생은 물론이고 안전에도 큰 문제가 될 수 있음.",
    contents:
      "근로자들이 편하게 화장실을 이용할 수 있도록, 화장실을 5층당 한 개 이상 설치하도록 하고자 함",
    attachments: [],
    agrees: 49,
    disagrees: 42,
    comments: 15,
    sendEmailStatus: true,
    createdAt: new Date(),
  },
];

export const postData = [...dummy, ...timeSeriesData];
