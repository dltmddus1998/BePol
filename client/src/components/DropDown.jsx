import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, NotiTitle, NotiList, Notify } from "./DropDownStyled";

export default function DropDown() {
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const maxWord = 10;

  const handleClick = (postId) => {
    navigate(`/detail/${postId}`);
  };

  const sliceTitleStr = (str) => {
    return str.slice(0, maxWord);
  };

  return (
    <div>
      <Container>
        <NotiTitle>알림</NotiTitle>
        <NotiList>
          {notifications.length ? (
            notifications.map((notification, idx) => {
              return notification.title ? (
                <Notify
                  onClick={() => handleClick(notification.postId)}
                  key={idx}
                >
                  <div>✉️ 새 댓글</div>
                  <div>
                    {notification.title.length > maxWord
                      ? `${sliceTitleStr(notification.title)}...`
                      : `${notification.title}`}
                  </div>
                </Notify>
              ) : (
                <></>
              );
            })
          ) : (
            <>새로운 알림이 없습니다.</>
          )}
        </NotiList>
      </Container>
    </div>
  );
}
