import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import React from "react";
import styled from "styled-components";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "src/features/chatSlice";
import { db } from "src/firebase";
import { useHistory } from "react-router";

interface ChatProps {
  id: string;
  imageUrl: string;
  profilePic: string;
  read: boolean;
  timestamp: any;
  username: string;
}

export const Chat: React.FC<ChatProps> = ({
  id,
  imageUrl,
  profilePic,
  timestamp,
  read,
  username,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chats/view");
    }
  };

  return (
    <ChatContainer onClick={open}>
      <ChatAvatar src={profilePic}>{username[0].toUpperCase()}</ChatAvatar>
      <ChatInfo>
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </ChatInfo>

      {!read && <ChatReadIcon />}
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const ChatAvatar = styled(Avatar)`
  object-fit: contain;
  height: 35px !important;
  width: 35px !important;
`;

const ChatInfo = styled.div`
  padding-left: 5px;
  flex: 1;

  > h4 {
    font-size: 14px;
    font-weight: 500;
  }

  > p {
    font-size: 10px;
  }
`;

const ChatReadIcon = styled(StopRoundedIcon)`
  color: #ed3b55;
`;
