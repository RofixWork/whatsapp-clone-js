import { collection, orderBy, query, where } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { UserAvatar } from "../styledComponents/UserAvatar";
import getRecipientEmail from "../utils/getRecipientEmail";
import Chat from "./Chat";

const Chats = () => {
  const [user] = useAuthState(auth);
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", user?.email)
  );
  const [allChatsSnapshot] = useCollection(q);

  return (
    <Container>
      {allChatsSnapshot &&
        allChatsSnapshot?.docs?.map((chat) => {
          return <Chat key={chat?.id} chat={chat} user={user} />;
        })}
    </Container>
  );
};
const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.dark.scroll};
  }
`;

export default Chats;
