import { useNavigate } from "react-router-dom";
import {
  TopCardSection,
  Card,
  CardDay,
  CardDetail,
  CardTitle,
  CardButton,
  CardIcon,
} from "./TopCardStyled";

export default function TopCard({ info }) {
  const navigate = useNavigate();
  const maxWord = 75;

  const handleGetCardId = (e) => {
    navigate(`/detail/${e.currentTarget.id}`);
  };
  const sliceTitleStr = (str) => {
    return str.slice(0, maxWord);
  };
  return (
    <>
      <TopCardSection>
        <Card id={info.id} onClick={(e) => handleGetCardId(e)}>
          {info.dDay <= 3 ? (
            info.dDay === 0 ? (
              <CardDay imminent="high">D-Day</CardDay>
            ) : (
              <CardDay imminent="high">D-{info.dDay}</CardDay>
            )
          ) : (
            <CardDay imminent="low">D-{info.dDay}</CardDay>
          )}
          {info.title.length > maxWord ? (
            <CardTitle>
              <h3>{sliceTitleStr(info.title)}... </h3>
            </CardTitle>
          ) : (
            <CardTitle>
              <h3>{info.title}</h3>
            </CardTitle>
          )}
          <CardDetail>
            <CardButton>
              <CardIcon>
                <img src="/images/likesIcon.png" alt="likes Icon" />
              </CardIcon>
              <p>{info.agrees}</p>
            </CardButton>
            <CardButton>
              <CardIcon>
                <img src="/images/dislikesIcon.png" alt="dislikes Icon" />
              </CardIcon>
              <p>{info.disagrees}</p>
            </CardButton>
            <CardButton>
              <CardIcon>
                <img src="/images/commentsCntIcon.png" alt="comments Icon" />
              </CardIcon>
              <p>{info.comments}</p>
            </CardButton>
          </CardDetail>
        </Card>
      </TopCardSection>
    </>
  );
}
