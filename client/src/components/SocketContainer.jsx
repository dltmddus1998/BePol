import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  socketConnect,
  newComment,
  checkNotification,
} from "../reducers/notificationSlice";

export default function SocketContainer() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const user = useSelector((state) => state.user.userInfo);
  let socketRef = useRef(null);

  const addNotif = (postId, title) => {
    const newNotif = { postId: postId, title: title, isChecked: false };

    dispatch(newComment(newNotif));
    dispatch(checkNotification(false));
  };

  useEffect(() => {
    let socket;
    if (isLogin) {
      socketRef.current = io(process.env.REACT_APP_API_URI, {
        transports: ["websocket"],
      });
      socket = socketRef.current;

      socket.on("error", (error) => {
        console.log(error);
      });

      socket.on("connect", () => {
        dispatch(socketConnect(socket.id));
        const userId = user.id;
        socket.emit("userId", userId);
      });

      socket.on("newComment", (postId, title) => {
        addNotif(postId, title);
      });

      socket.on("disconnect", () => {
        dispatch(socketConnect(null));
      });
    }

    return () => {
      if (socket) socket.disconnect();
      dispatch(socketConnect(null));
    };
  }, [isLogin]);
}
