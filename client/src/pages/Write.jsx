import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Body,
  Title,
  DropMenuContainer,
  DropMenu,
  DropTitle,
  DropOptions,
  Category,
  InputField,
  Textarea,
  Length,
  AttachedField,
  AttachedInput,
  AttachedFile,
  ButtonField,
} from "./WriteStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Write({ history }) {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.login.accessToken);
  const allCategory = [
    // { 0: "법률/사법" },
    // { 1: "금융/경제" },
    // { 2: "교육" },
    // { 3: "과학기술/정보통신" },
    // { 4: "외교/통일/국방" },
    // { 5: "행정" },
    // { 6: "문화/예술/관광" },
    // { 7: "농업/식품/수산" },
    // { 8: "국토/교통" },
    // { 9: "산업/통상/기업" },
    // { 10: "보건/복지/식품안전" },
    // { 11: "환경/성평등/청소년/노동" },
    // { 12: "기타" },
    { 0: "법률 사법" },
    { 1: "금융 경제" },
    { 2: "교육" },
    { 3: "과학기술 정보통신" },
    { 4: "외교 통일 국방" },
    { 5: "행정" },
    { 6: "문화 예술 관광" },
    { 7: "농업 식품 수산" },
    { 8: "국토 교통" },
    { 9: "산업 통상 기업" },
    { 10: "보건 복지 식품안전" },
    { 11: "환경 성평등 청소년 노동" },
    { 12: "기타" },
  ];
  const [selectedCategory, setSelectedCategory] = useState([]); // 선택된 카테고리를 저장하는 state
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [purport, setPurport] = useState("");
  const [purportLength, setPurportLength] = useState(0);
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState(0);
  // textarea 높이조절을 하기 위한 state
  // const [purportHeight, setPurportHeight] = useState("150px");
  // const [contentsHeight, setContentsHeight] = useState("200px");
  const [filesVolume, setFilesVolume] = useState(0);
  const [files, setFiles] = useState([]);
  const textareaRef = useRef([]);
  const inputRef = useRef([]);

  // 카테고리 선택 함수
  const handleCategory = (e, idx) => {
    if (e.target.checked && !selectedCategory.includes(e.target.value)) {
      if (selectedCategory.length < 3) {
        setSelectedCategory([...selectedCategory, e.target.value]);
      } else {
        inputRef.current[idx].checked = false;
      }
    } else if (!e.target.checked && selectedCategory.includes(e.target.value)) {
      setSelectedCategory(
        selectedCategory.filter((el) => el !== e.target.value)
      );
    }
    setIsDropdownMenu(false);
  };

  // 첨부파일 변경적용 함수
  const handleChangeFile = (e) => {
    // 2개의 파일가지 첨부가능
    if (!e.target.files.length) return;
    if (files.length + e.target.files.length > 2) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "파일은 최대 2개까지 가능합니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // 처음 넣은 파일이 1개인 경우
      if (e.target.files.length === 1) {
        const volume = e.target.files[0].size;
        if (filesVolume + volume > 5242880) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "파일은 최대 5MB까지 가능합니다.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setFilesVolume(filesVolume + volume);
          setFiles([...files, ...e.target.files]);
        }
      } else {
        const volume = e.target.files[0].size + e.target.files[1].size;
        if (volume > 5242880) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "파일은 최대 5MB까지 가능합니다.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setFilesVolume(volume);
          setFiles([...files, ...e.target.files]);
        }
      }
    }
  };

  // 파일삭제 버튼을 눌렀을 때 함수
  const handleRemoveFile = (idx) => {
    if (files.length === 1) {
      setFiles([]);
    } else {
      const filelist = [...files].splice(idx - 1, 1);
      setFiles(filelist);
    }
  };

  // 취소버트늘 눌렀을 때 함수
  const handleCancle = () => {
    Swal.fire({
      title: "등록을 취소하시겠습니까?",
      text: "작성한 내용은 저장되지 않습니다.",
      icon: "warning",
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
  };

  // 법안발의 등록버튼을 눌렀을 때 함수
  const handleRegister = () => {
    if (
      selectedCategory.length &&
      title.length &&
      purport.length &&
      contents.length
    ) {
      Swal.fire({
        title: "작성하신 법안을 등록하시겠습니까?",
        text: "등록한 법안은 수정할 수 없습니다",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          if (files.length) {
            for (let file of files) formData.append("attachments", file);
          }
          for (let category of selectedCategory)
            formData.append("category", category);
          formData.append("title", title);
          formData.append("purport", purport);
          formData.append("contents", contents);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: accessToken,
            },
          };
          axios
            .post(`${process.env.REACT_APP_API_URI}/posts`, formData, config)
            .then((res) => {
              navigate("/");
            });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "필수입력사항을 확인해주세요.",
        text: "필수입력사항은 카테고리, 제목, 취지, 내용입니다.",
        showConfirmButton: true,
      });
    }
  };

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });

  return (
    <Body>
      <Title>
        <div> 모의 법안 등록하기</div>
        <img src={"images/writeIcon.png"} alt={"등록아이콘"}></img>
      </Title>
      <DropMenuContainer
        marginBottom={
          !isDropdownMenu && selectedCategory.length ? "5px" : "54.5px"
        }
      >
        <DropMenu>
          <DropTitle
            onClick={() => setIsDropdownMenu(!isDropdownMenu)}
            borderRadius={isDropdownMenu ? "none" : "10px"}
          >
            <span>카테고리</span>
            {isDropdownMenu ? (
              <FontAwesomeIcon icon={faCaretUp} size={"xs"} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} size={"xs"} />
            )}
          </DropTitle>
          {isDropdownMenu ? (
            <DropOptions>
              {allCategory.map((category, idx) => (
                <label key={idx}>
                  <input
                    type={"checkbox"}
                    ref={(el) => (inputRef.current[idx] = el)}
                    defaultChecked={
                      selectedCategory.includes(category[idx]) ? true : false
                    }
                    value={category[idx]}
                    onClick={(e) => handleCategory(e, idx)}
                  />
                  {category[idx]}
                </label>
              ))}
            </DropOptions>
          ) : null}
        </DropMenu>
        <div>최대 3개까지 선택가능합니다.</div>
      </DropMenuContainer>
      <Category>
        {isDropdownMenu
          ? null
          : selectedCategory.map((select, idx) => (
              <span key={idx}>{select}</span>
            ))}
      </Category>
      <InputField>
        <div>제목</div>
        <input
          value={title}
          type={"text"}
          placeholder={"제목을 입력해주세요."}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleLength(e.target.value.length);
          }}
        ></input>
        <Length color={titleLength > 150 ? "red" : "black"}>
          {titleLength > 150 ? <div>150자를 초과했습니다.</div> : null}
          <div>{titleLength}/150</div>
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 취지</div>
        <Textarea
          ref={(el) => (textareaRef.current[0] = el)}
          height={"150px"}
          value={purport}
          placeholder={"취지를 입력해주세요."}
          onChange={(e) => {
            setPurport(e.target.value);
            setPurportLength(e.target.value.length);
            // setPurportHeight(textareaRef.current[0].scrollHeight - 10 + "px");
          }}
        ></Textarea>
        <Length color={purportLength > 3000 ? "red" : "black"}>
          {purportLength > 3000 ? <div>3000자를 초과했습니다.</div> : null}
          <div>{purportLength}/3000</div>
        </Length>
      </InputField>
      <InputField>
        <div>법안 발의 내용</div>
        <Textarea
          ref={(el) => (textareaRef.current[1] = el)}
          height={"200px"}
          value={contents}
          placeholder={"내용를 입력해주세요."}
          onChange={(e) => {
            setContents(e.target.value);
            setContentsLength(e.target.value.length);
            // setContentsHeight(textareaRef.current[1].scrollHeight - 10 + "px");
          }}
        ></Textarea>
        <Length color={contentsLength > 4000 ? "red" : "black"}>
          {contentsLength > 4000 ? <div>4000자를 초과했습니다.</div> : null}
          <div>{contentsLength}/4000</div>
        </Length>
      </InputField>
      <AttachedField>
        <div>첨부파일</div>
        <AttachedInput htmlFor={"attached"}>
          <div>
            <span>
              ※ 첨부 가능한 파일은 이미지, PDF이고 최대 5MB, 2개 파일까지 첨부
              가능합니다.
            </span>
            <span>첨부하기</span>
          </div>
          <input
            id={"attached"}
            type={"file"}
            accept={"image/*, .pdf"}
            onChange={handleChangeFile}
            multiple={"multiple"}
          />
        </AttachedInput>
      </AttachedField>
      <AttachedFile>
        {" "}
        {files.map((file, idx) => (
          <div key={idx}>
            {file.name}
            <FontAwesomeIcon
              icon={faRectangleXmark}
              onClick={() => handleRemoveFile(idx)}
            ></FontAwesomeIcon>
          </div>
        ))}
      </AttachedFile>
      <ButtonField>
        <div type={"button"} onClick={handleCancle}>
          취소하기
        </div>
        <div type={"button"} onClick={handleRegister}>
          등록하기
        </div>
      </ButtonField>
    </Body>
  );
}
