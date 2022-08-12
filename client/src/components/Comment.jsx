import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as like } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as unlike } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import {
  Container,
  WriterInfo,
  Writer,
  ProsAndCons,
  CommentButton,
  ModifyAndDelete,
  CancleAndCheck,
  Contents,
  InputModifyComment,
} from "./CommentStyled";

export default function Comment({ comment, idx, commentList, setCommentList }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.login.accessToken);
  const [modifiedComment, setModifiedComment] = useState("");
  const [modify, isModify] = useState(false);
  const [likes, isLikes] = useState(comment.isliked);
  const [likesCount, setLikesCount] = useState(comment.likes);
  // const [height, setHeight] = useState("");
  const textareaRef = useRef(null);
  const data = {
    commentContent: modifiedComment,
  };
  const config = {
    headers: {
      authorization: accessToken,
    },
  };
  //  댓글 수정상태에서 확인버튼 눌렀을 때 함수
  const handleModifyComment = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/comments/${comment._id}`,
        data,
        config
      )
      .then((reuslt) => {
        const modifiedCommentList = commentList.slice();
        modifiedCommentList[idx]["contents"] = modifiedComment;
        setCommentList(modifiedCommentList);
        isModify(false);
      })
      .catch((error) => console.log(error));
  };

  // 댓글 삭제버튼 눌렀을 때 함수
  const handleRemoveComment = () => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URI}/comments/${comment._id}`,
            config
          )
          .then((result) => {
            // window.location.reload();
            const deletedCommentList = [
              ...commentList.slice(0, idx),
              ...commentList.slice(idx + 1, commentList.length),
            ];
            setCommentList(deletedCommentList);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // 좋아요버튼을 눌렀을 때
  const handleLikes = () => {
    if (!likes) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/comments/likes/${comment._id}`,
          "",
          config
        )
        .then((result) => {
          setLikesCount(result.data.likesCount);
          isLikes(true);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .delete(
          `${process.env.REACT_APP_API_URI}/comments/likes/${comment._id}`,
          config
        )
        .then((result) => {
          setLikesCount((preState) => preState - 1);
          isLikes(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (modify && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.value = comment.contents;
    }
  }, [modify]);

  return (
    <Container>
      <WriterInfo>
        <Writer>
          <ProsAndCons
            background={
              comment.answer
                ? "#FB7777"
                : comment.answer === false
                ? "#A5A5A5"
                : "#FFFFFF"
            }
          ></ProsAndCons>
          <div>{comment.username}</div>
        </Writer>
        {userInfo.id === comment.userId ? (
          !modify ? (
            <CommentButton>
              <ModifyAndDelete onClick={() => isModify(true)}>
                수정
              </ModifyAndDelete>
              <span> | </span>
              <ModifyAndDelete onClick={handleRemoveComment}>
                삭제
              </ModifyAndDelete>
            </CommentButton>
          ) : (
            <CommentButton>
              <CancleAndCheck
                background={"#474747"}
                cursor={"pointer"}
                onClick={() => {
                  isModify(false);
                }}
              >
                취소
              </CancleAndCheck>
              <span> | </span>
              <CancleAndCheck
                background={
                  !modifiedComment.length ||
                  modifiedComment === comment.contents
                    ? "#A5A5A5"
                    : "#474747"
                }
                cursor={
                  !modifiedComment.length ||
                  modifiedComment === comment.contents
                    ? "default"
                    : "pointer"
                }
                onClick={
                  !modifiedComment.length ||
                  modifiedComment === comment.contents
                    ? null
                    : handleModifyComment
                }
              >
                확인
              </CancleAndCheck>
            </CommentButton>
          )
        ) : null}
      </WriterInfo>
      <Contents>
        {!modify ? (
          <div>{comment.contents}</div>
        ) : (
          <InputModifyComment
            type={"text"}
            ref={textareaRef}
            value={modifiedComment}
            // height={height}
            onChange={(e) => {
              setModifiedComment(e.target.value);
              // setHeight(textareaRef.current.scrollHeight);
            }}
          ></InputModifyComment>
        )}
        <div>
          {likes ? (
            <FontAwesomeIcon
              onClick={handleLikes}
              icon={like}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              onClick={handleLikes}
              icon={unlike}
            ></FontAwesomeIcon>
          )}

          <div>{likesCount}</div>
        </div>
      </Contents>
    </Container>
  );
}
