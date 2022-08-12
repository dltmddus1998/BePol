import * as postRepository from "../../services/post.js";
import { downloadS3File } from "../functions/file.js";
import { verifyToken } from "../functions/authentication.js";

export const getPostsList = async (req, res, next) => {
  /**
   * 기능: 법안 발의문 리스트 조회
   * 작성자: 이승연
   * 📌 쿼리별 게시글 리스트 조회 기능
   * 💡 query
   * 📍 category - 법률 카테고리 별 검색 ✔︎
   * 📍 sortby - 최신순, 마감임박순, 찬성순, 반대순 ✔︎
   * 📍 search - 검색 ✔︎
   * 📍 closed - 마감여부 ✔︎
   * 📍 page - 페이지당 게시물 개수 ✔︎
   *  📌 D-Day 계산 ✔︎
   */
  let { category, sortby, search, closed, page } = req.query;
  category = decodeURIComponent(category);
  // search = decodeURIComponent(search);

  let data;
  let dDayList = [];
  try {
    // 카테고리 제외
    if (closed === "true") {
      // 마감 완료
      data = await postRepository.getClosedSearchedTitleBySorting(
        search,
        sortby,
        page
      );
    } else if (closed === "false") {
      // 마감 x
      data = await postRepository.getSearchedTitleBySorting(
        search,
        sortby,
        page
      );
    }

    // 카테고리 검색일 경우
    if (category) {
      const categoryArr = category.split(",");
      if (closed === "true") {
        data = await postRepository.getClosedAllByCategory(
          categoryArr,
          search,
          sortby,
          page
        );

        if (data.length === 0) {
          return res.sendStatus(204);
        }

        return res.status(200).json({
          data: data[0],
        });
      } else if (closed === "false") {
        // 마감 + 마감x 모두 포함
        data = await postRepository.getAllByCategory(
          categoryArr,
          search,
          sortby,
          page
        );

        if (data.length === 0) {
          return res.sendStatus(204);
        }
        postRepository.getDday(data[0], dDayList);
        return res.status(200).json({
          data: data[0],
          dDayList,
        });
      }
    }

    if (data.length === 0) {
      return res.sendStatus(204);
    }

    postRepository.getDday(data, dDayList);

    return res.status(200).json({
      data,
      dDayList,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};

export const getThreePopularPostsList = async (req, res, next) => {
  /**
   * 기능: 게시판 hot3 리스트 조회 기능
   * 작성자: 이승연
   * - 메인페이지 hot3 게시글 기준 →
   * 찬성 반대 비율 차이가 10퍼센트 미만인 글들 중에서 투표수가 많은 기준으로 3개 선정, ✔︎
   * 투표수별 내림차순 나열은 getThreePopularPosts에서 구현 ✔︎
   * 💡 3개가 안되도 그대로 게시 ✔︎
   * db에 저장해 놓고 10분마다 업데이트(node-cron 라이브러리) ✔︎
   * 📌 D-Day 계산 ✔︎
   */

  // 매일 밤 11시 59분에 업데이트
  try {
    let dDayList = [];
    const data = await postRepository.getThreePopularPosts();

    postRepository.getDday(data, dDayList); // D-Day 계산

    if (!data) {
      return res.status(404).json({
        message: "Data is not found!",
      });
    } else {
      return res.status(200).json({
        // 해당 발의문의 postId와 D-DAY 값이 넘어옴 (dDayList)
        data,
        dDayList,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};

export const createPost = async (req, res) => {
  /**
   * 기능: 게시글 생성
   * 작성자: 나수민
   * 📌 첨부파일 업로드 미들웨어 거친 후 파일 경로를 저장해 도큐먼트 생성
   */

  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const { title, purport, contents, category } = req.body;

    const createdPost = await postRepository.createPost(
      user.id,
      user.username,
      title,
      category,
      purport,
      contents,
      req.files
    );

    res.json(createdPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  /**
   * 기능: 게시글 삭제
   * 작성자: 나수민
   * 📌 게시물과 함께 s3 버킷에 저장된 파일도 삭제
   */
  try {
    const user = verifyToken(req.headers["authorization"].split(" ")[1]);
    const deletedPost = await postRepository.deletePost(
      user.id,
      req.params.postId
    );

    if (deletedPost) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {}
};

export const getPost = async (req, res) => {
  /**
   * 기능: 게시글 상세조회
   * 작성자: 나수민
   * 📌 게시글 내에서 첨부파일 다운로드 기능 -> 새 엔드포인트 추가✔
   */
  try {
    const post = await postRepository.getPost(req.params.postId);
    const { __v, updatedAt, comments, ...postInfo } = post.toObject();

    if (req.headers["authorization"]) {
      const user = verifyToken(req.headers["authorization"].split(" ")[1]);
      const answer = await postRepository.getPostAnswer(
        req.params.postId,
        user.id
      );

      if (answer !== undefined) {
        postInfo.answer = answer;
      }
    }
    res.json(postInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileName = await postRepository.getFileName(
      req.params.postId,
      Number(req.query.fileIndex)
    );
    if (fileName) {
      downloadS3File(res, fileName);
    } else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
