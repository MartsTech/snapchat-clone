import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetImage, selectSelectedImage } from "src/features/chatSlice";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ChatView: React.FC = () => {
  const selectedImage = useSelector(selectSelectedImage);

  const dispatch = useDispatch();
  const history = useHistory();

  const exit = () => {
    dispatch(resetImage());
  };

  useEffect(() => {
    if (!selectedImage) {
      history.replace("/chats");
    }
  }, [selectedImage, history]);

  return (
    <ChatViewContainer>
      <img onClick={exit} src={selectedImage || ""} alt="view" />
      <ChatViewTimer>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </ChatViewTimer>
    </ChatViewContainer>
  );
};

export default ChatView;

const ChatViewContainer = styled.div`
  position: relative;

  > img {
    cursor: pointer;
  }
`;

const ChatViewTimer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;
