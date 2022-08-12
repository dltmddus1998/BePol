import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TopCard from "../components/TopCard";
import Category from "../components/Category";
import ListCard from "../components/ListCard";
import {
  MainSection,
  Section,
  Text,
  SearchCategory,
  SearchWrap,
  SearchTab,
  SearchButton,
  SearchExpireTap,
} from "./MainStyled.js";

export default function Main() {
  /*
   * 기능: 메인 페이지
   * 작성자: 송혜원
   * 📌 Top3 게시글 보이기 ✔︎
   * 📌 write 페이지와 연결 ✔︎
   * 📌 카테고리별 게시글 보이기 ✔︎
   * 📌 검색 및 정렬방식 선택 ✔︎
   * 📌 마감된 게시글만 보이기 ✔︎
   * 📌 게시글 카드 무한 스크롤로 보이기
   */

  const navigate = useNavigate();
  const viewList = ["최신순", "마감임박순", "찬성순", "반대순"];
  const allCategory = [
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
  const isLogin = useSelector((state) => state.login.isLogin);
  const [page, setPage] = useState(1);
  const [popularList, setPopularList] = useState([]);
  const [posts, setPostInfo] = useState([]);
  const [clickedCategory, setCategory] = useState(0);
  const [searchInfo, setSearchInfo] = useState({
    search: "",
    sortby: viewList[0],
    closed: false,
    category: "",
    page: page,
  });

  //로그인 안한 회원에게 알림창 안내
  const handleLoginAlert = () => {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다",
      text: "로그인 후 사용해주세요",
      icon: "warning",
    });
  };

  const handlePopularList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/popular/list`)
      .then((result) => {
        let popularPostInfo = result.data.data.map((item, idx) => {
          return {
            id: item.postId,
            title: item.title,
            agrees: item.agrees,
            disagrees: item.disagrees,
            comments: item.comments,
            dDay: result.data.dDayList[idx].dDay,
          };
        });
        setPopularList(popularPostInfo);
      });
  };

  const handlePostInfo = () => {
    axios(`${process.env.REACT_APP_API_URI}/posts`, {
      params: {
        category: encodeURIComponent(searchInfo.category),
        sortby: searchInfo.sortby,
        search: searchInfo.search,
        closed: searchInfo.closed,
        page: searchInfo.page,
      },
    }).then((result) => {
      setTimeout(() => {
        if (result.status === 204) {
          setPostInfo([]);
        } else {
          let postInfo = result.data.data.map((item, idx) => {
            return {
              id: item._id,
              title: item.title,
              agrees: item.agrees,
              disagrees: item.disagrees,
              comments: item.comments,
              dDay: result.data.dDayList[idx].dDay,
            };
          });
          setPostInfo(postInfo);
        }
      }, 1000);
    });
  };

  const handleInputValue = (key) => (e) => {
    // onChange 가 발생할 경우 값을 넣어주는 함수
    setSearchInfo({ ...searchInfo, [key]: e.target.value });
  };
  const handleCheckedValue = (key) => (e) => {
    setSearchInfo({ ...searchInfo, [key]: e.target.checked });
  };
  const handlePageValue = (key) => {
    setSearchInfo({ ...searchInfo, [key]: page });
  };
  const handleCategoryValue = (key) => (input) => {
    if (input.length > 0) {
      setSearchInfo({
        ...searchInfo,
        [key]: allCategory[input][input],
      });
    } else {
      setSearchInfo({ ...searchInfo, [key]: "" });
    }
  };

  useEffect(() => {
    handlePopularList();
    handlePostInfo();
    // handlePageValue("page");
  }, [searchInfo.closed, searchInfo.category, searchInfo.sortby]);

  useEffect(() => {
    handlePageValue("page");
    // handlePostInfo();
  }, [page]);

  return (
    <>
      <MainSection>
        <Section display="grid">
          <h2>이번달 HOT🔥 모의법안</h2>
          {popularList.length > 0 ? (
            popularList.map((el, idx) => <TopCard key={idx} info={el} />)
          ) : (
            <h3>
              아직 인기 게시글이 없어요 🧐 <br />
              모의 법안에 적극적으로 참여해보세요!
            </h3>
          )}
        </Section>
        {isLogin ? (
          <Section
            onClick={() => {
              navigate("/write");
            }}
            backgroundColor="dark"
          >
            <Text>
              <span>모의법안 발의하기</span>
              <img src="/images/judgeIcon.png" alt="Judge Icon" />
            </Text>
          </Section>
        ) : (
          <Section onClick={handleLoginAlert} backgroundColor="dark">
            <Text>
              <span>모의법안 발의하기</span>
              <img src="/images/judgeIcon.png" alt="Judge Icon" />
            </Text>
          </Section>
        )}
        <Section>
          <h2>모의법안 둘러보기</h2>
          <img src="/images/binocularsIcon.png" alt="Binoculars Icon" />
        </Section>
        <Category
          allCategory={allCategory}
          clickedCategory={clickedCategory}
          onClick={(clickedItem) => {
            setCategory(clickedItem);
            handleCategoryValue("category")(clickedItem);
            setPage(1);
          }}
        />
        <Section>
          <SearchWrap>
            <SearchTab
              type="text"
              onChange={handleInputValue("search")}
            ></SearchTab>
            <SearchCategory onChange={handleInputValue("sortby")}>
              {viewList.map((el, idx) => (
                <option key={idx} value={el}>
                  {el}
                </option>
              ))}
            </SearchCategory>
            <SearchButton onClick={handlePostInfo}>검색</SearchButton>
          </SearchWrap>
        </Section>
        <SearchExpireTap>
          {"마감된 모의법안"}
          <input type="checkbox" onChange={handleCheckedValue("closed")} />
        </SearchExpireTap>
        {posts.length > 0 ? (
          <Section display="grid" list>
            {posts.map((el, idx) => (
              <ListCard key={idx} info={el} />
            ))}
          </Section>
        ) : (
          <Section display="grid">
            <h3>
              아직 등록된 법안이 없어요 🧐 <br />
              모의 법안에 적극적으로 참여해보세요!
            </h3>
          </Section>
        )}
      </MainSection>
    </>
  );
}
