import { Avatar } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { Chat } from "../components/Chat";
import { db } from "../firebase";
import { PostContent } from "../types";

const Chats: React.FC = () => {
  const [posts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <ChatsContainer>
      <ChatsHeader>
        <ChatsAvatar />
        <ChatsSearch>
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </ChatsSearch>
        <ChatsIconChat />
      </ChatsHeader>
      <ChatsPosts>
        {posts?.docs.map((doc) => {
          const {
            imageUrl,
            profilePic,
            read,
            timestamp,
            username,
          }: PostContent = doc.data() as any;

          return (
            <Chat
              key={doc.id}
              id={doc.id}
              imageUrl={imageUrl}
              profilePic={profilePic}
              read={read}
              timestamp={timestamp}
              username={username}
            />
          );
        })}
      </ChatsPosts>
    </ChatsContainer>
  );
};

export default Chats;

const ChatsContainer = styled.div`
  position: relative;
  height: 450px;
  width: 300px;
`;

const ChatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #059ee0;
  height: 50px;
`;

const ChatsAvatar = styled(Avatar)`
  object-fit: contain;
  height: 25px !important;
  width: 25px !important;
`;

const ChatsSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 8px;

  > input {
    outline: none;
    background: transparent;
    border: none;
    font-size: 12px;
    flex: 1;
    color: white;

    ::placeholder {
      color: white;
      opacity: 1;
    }
  }
`;

const ChatsIconChat = styled(ChatBubbleIcon)``;

const ChatsPosts = styled.div`
  box-shadow: 1px -7px 7px -6px rgba(0, 0, 0, 0.44);
  height: 409px;
  margin-top: -9px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: white;
  overflow: scroll;

  /*Hide scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;
