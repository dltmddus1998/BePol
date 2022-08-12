import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { showStatisticsModal } from "../reducers/modalSlice";
import Comment from "../components/Comment";
import BarGraphModal from "../components/BarGraphModal";
import Loading from "../components/Loading";
import { Body, ButtonField } from "./WriteStyled";
import {
  Title,
  Info,
  ResultField,
  ProsAndCons,
  VoteField,
  Vote,
  ContentsField,
  Contents,
  AttachedField,
  AttachedFile,
  InputField,
  SortBy,
  Sort,
  CommentsField,
} from "./DetailStyled";

export default function Detail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.login.accessToken);
  const isLogin = useSelector((state) => state.login.isLogin);
  const isStatisticsModal = useSelector((state) => state.modal.statisticsModal);
  const [postInfo, setPostInfo] = useState(null);
  const [statistic, setStatistic] = useState([]);
  const [agree, isAgree] = useState(undefined);
  const [agreeCount, setAgreeCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [commentList, setCommentList] = useState([]);
  const [update, isUpdate] = useState(false);
  const [endUpdate, isEndUpdate] = useState(false);
  const [page, setPage] = useState(1);

  const config = {
    headers: {
      Authorization: accessToken,
    },
  };
  // 삭제하기 버튼 클릭 함수
  const handleRemoveButton = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/posts/${postId}`, config)
      .then((result) => {
        Swal.fire({
          title: "법안을 삭제하시겠습니까?",
          text: "삭제한 법안은 복구되지 않습니다.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      });
  };

  // 날짜계산 함수
  const AfterOneMonth = (date) => {
    const plusOneMonth = new Date(
      new Date(date).getTime() + 1000 * 60 * 60 * 24 * 30
    );
    const dateFormat =
      plusOneMonth.getFullYear() +
      "-" +
      (plusOneMonth.getMonth() + 1 <= 9
        ? "0" + (plusOneMonth.getMonth() + 1)
        : plusOneMonth.getMonth() + 1) +
      "-" +
      (plusOneMonth.getDate() <= 9
        ? "0" + plusOneMonth.getDate()
        : plusOneMonth.getDate());
    return `${date.slice(0, 10)} ~ ${dateFormat}`;
  };

  // 투표 상세 결과보기 를 클릭햇을 때 함수
  const showDetailResult = () => {
    dispatch(showStatisticsModal(true));
  };

  // 투표 했을 때 함수
  const handleVote = (vote) => {
    // vote(true, false) agree(true, false, undefined)
    // true              true             투표 취소
    // false             false            투표 취소
    // true              undefined        찬성투표
    // false             undefined        반대투표
    // true              false            투표 취소 => 찬성투표
    // false             true             투표 취소 => 반대투표
    //! agree에서 false 와 undefined 구별해주기
    const data = {
      agree: vote,
    };
    if (!isLogin) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "로그인이 필요한 작업입니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (vote && agree) {
      axios
        .delete(`${process.env.REACT_APP_API_URI}/posts/vote/${postId}`, config)
        .then((result) => {
          isAgree(undefined);
          setAgreeCount((preState) => preState - 1);
        })
        .catch((error) => console.log(error));
    } else if (vote === false && agree === false) {
      axios
        .delete(`${process.env.REACT_APP_API_URI}/posts/vote/${postId}`, config)
        .then((result) => {
          isAgree(undefined);
          setDisagreeCount((preState) => preState - 1);
        })
        .catch((error) => console.log(error));
    } else if (vote && agree === undefined) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/posts/vote/${postId}`,
          data,
          config
        )
        .then((result) => {
          isAgree(result.data.agree);
          setAgreeCount((preState) => preState + 1);
        })
        .catch((error) => console.log(error));
    } else if (!vote && agree === undefined) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/posts/vote/${postId}`,
          data,
          config
        )
        .then((result) => {
          isAgree(result.data.agree);
          setDisagreeCount((preState) => preState + 1);
        })
        .catch((error) => console.log(error));
    } else if (vote && agree === false) {
      axios
        .delete(`${process.env.REACT_APP_API_URI}/posts/vote/${postId}`, config)
        .then((result) => {
          isAgree(undefined);
          setDisagreeCount((preState) => preState - 1);
          axios
            .post(
              `${process.env.REACT_APP_API_URI}/posts/vote/${postId}`,
              data,
              config
            )
            .then((result) => {
              isAgree(result.data.agree);
              setAgreeCount((preState) => preState + 1);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else if (!vote && agree) {
      axios
        .delete(`${process.env.REACT_APP_API_URI}/posts/vote/${postId}`, config)
        .then((result) => {
          isAgree(undefined);
          setAgreeCount((preState) => preState - 1);
          axios
            .post(
              `${process.env.REACT_APP_API_URI}/posts/vote/${postId}`,
              data,
              config
            )
            .then((result) => {
              isAgree(result.data.agree);
              setDisagreeCount((preState) => preState + 1);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  // 첨부파일 다운로드받는 함수
  const handleDownloadFile = (idx) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/posts/download/${postId}?fileIndex=${idx}`
      )
      .then((result) => {
        const url = result.config.url;
        const a = document.createElement("a");
        a.href = url;
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((error) => console.log(error));
  };

  // 댓글작성 버튼 눌렀을 때 함수
  const handleCreateComment = () => {
    if (!isLogin) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "로그인이 필요한 작업입니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (comment.length) {
      setComment("");
      const data = {
        commentContent: comment,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/comments/${postId}`,
          data,
          config
        )
        .then((result) => {
          setCommentList([result.data.data, ...commentList]);
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "입력한 댓글이 없습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // 댓글들을 요청하는 함수
  const requestComments = () => {
    isUpdate(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/comments/${postId}?sortby=${sortBy}&page=${page}`,
        config
      )
      .then((result) => {
        setTimeout(() => {
          if (!result.data.data.length) {
            isEndUpdate(true);
          } else {
            setCommentList([...commentList, ...result.data.data]);
            setPage((preState) => preState + 1);
            isUpdate(false);
          }
        }, 2000);
      });
  };

  // 페이지 이동시 처음 post와 통계 정보 가져오기
  useEffect(() => {
    dispatch(showStatisticsModal(false));
    window.scrollTo(0, 0);
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/${postId}`, config)
      .then((result) => {
        setTimeout(() => {
          setPostInfo(result.data);
          isAgree(result.data.answer);
          setAgreeCount(result.data.agrees);
          setDisagreeCount(result.data.disagrees);
        }, 2000);
      });
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/record/${postId}`)
      .then((result) => setStatistic(result.data.data));
  }, []);

  // 댓글 정보 불러오기
  useEffect(() => {
    requestComments();
  }, [sortBy]);

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !update && !endUpdate) {
      requestComments();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {postInfo !== null ? (
        <Body>
          <Title>
            {postInfo.category.map((category, idx) => (
              <span key={idx}>{category}</span>
            ))}
            <div>{postInfo.title}</div>
          </Title>
          <Info>
            <div className={"writer"}>
              <div>작성자: {postInfo.username}</div>
              {postInfo.userId === userInfo.id ? (
                <div className={"removeButton"} onClick={handleRemoveButton}>
                  삭제하기
                </div>
              ) : null}
            </div>
            <span>{AfterOneMonth(postInfo.createdAt)}</span>
          </Info>
          <ResultField>
            <div className={"detailResult"} onClick={showDetailResult}>
              투표 상세 결과보기
            </div>
            <div className={"propsAndCons"}>
              <ProsAndCons
                background={
                  agreeCount + disagreeCount === 0 ? "#414144" : "#FB7777"
                }
                flex={
                  agreeCount + disagreeCount === 0
                    ? 1
                    : agreeCount / (agreeCount + disagreeCount)
                }
                textAlign={"left"}
              >
                <div className={"pros"}>{agreeCount}</div>
              </ProsAndCons>
              <ProsAndCons
                background={
                  agreeCount + disagreeCount === 0 ? "#414144" : "#A5A5A5"
                }
                flex={
                  agreeCount + disagreeCount === 0
                    ? 1
                    : disagreeCount / (agreeCount + disagreeCount)
                }
                textAlign={"right"}
              >
                <div className={"cons"}>{disagreeCount}</div>
              </ProsAndCons>
            </div>
          </ResultField>
          <VoteField>
            <Vote onClick={() => handleVote(true)}>
              <div>찬 성</div>
              {agree ? (
                <img src={"/images/vote.png"} alt={"투표마크"}></img>
              ) : (
                <div></div>
              )}
            </Vote>
            <Vote onClick={() => handleVote(false)}>
              <div>반 대</div>
              {agree === false ? (
                <img src={"/images/vote.png"} alt={"투표마크"}></img>
              ) : (
                <div></div>
              )}
            </Vote>
          </VoteField>
          <ContentsField>
            <Contents>
              <div>법안 발의 취지</div>
              <div className={"purport"}>{postInfo.purport}</div>
            </Contents>
            <Contents>
              <div>법안 발의 내용</div>
              <div className={"contents"}>{postInfo.contents}</div>
            </Contents>
            <AttachedField>
              <div>첨부파일</div>
              <AttachedFile>
                {postInfo.attachments.map((file, idx) => (
                  <div key={idx} onClick={() => handleDownloadFile(idx)}>
                    {file.fileName}
                  </div>
                ))}
              </AttachedFile>
            </AttachedField>
            <ButtonField>
              <div onClick={() => navigate("/")}>목록보기</div>
            </ButtonField>
          </ContentsField>
          <InputField>
            <textarea
              value={comment}
              placeholder={"댓글..."}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div onClick={handleCreateComment}>댓글</div>
          </InputField>
          <SortBy>
            <Sort
              bold={sortBy === "recent" ? "bold" : "none"}
              onClick={() => {
                if (sortBy !== "recent") {
                  setPage(1);
                  setCommentList([]);
                  isEndUpdate(false);
                  setSortBy("recent");
                }
              }}
            >
              최신순
            </Sort>
            <span> | </span>
            <Sort
              bold={sortBy === "likes" ? "bold" : "none"}
              onClick={() => {
                if (sortBy !== "likes") {
                  setPage(1);
                  setCommentList([]);
                  isEndUpdate(false);
                  setSortBy("likes");
                }
              }}
            >
              공감순
            </Sort>
          </SortBy>
          <CommentsField>
            {commentList.map((comment, idx) => (
              <Comment
                key={comment._id}
                comment={comment}
                idx={idx}
                commentList={commentList}
                setCommentList={setCommentList}
              ></Comment>
            ))}
            {update && !endUpdate ? (
              <div className={"loading"}>
                <FontAwesomeIcon
                  icon={faSpinner}
                  size={"3x"}
                  spin
                ></FontAwesomeIcon>
              </div>
            ) : null}
          </CommentsField>
          {isStatisticsModal ? (
            <BarGraphModal
              voteCount={agreeCount + disagreeCount}
              statistic={statistic}
            ></BarGraphModal>
          ) : null}
        </Body>
      ) : (
        <Loading />
      )}
    </>
  );
}
