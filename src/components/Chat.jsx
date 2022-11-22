import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import { UserAvatar } from "../styledComponents/UserAvatar";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ chat, user }) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(chat?.data()?.users, user?.email))
  );
  const [recipient] = useCollection(q);

  //   naviagte
  const navigate = useNavigate();

  return (
    <ChatContainer onClick={() => navigate(`/chat/${chat?.id}`)}>
      {recipient?.docs?.[0]?.data()?.image ? (
        <UserAvatar src={recipient?.docs?.[0]?.data()?.image} />
      ) : (
        <UserAvatar>
          {getRecipientEmail(
            chat?.data()?.users,
            user?.email
          )?.[0]?.toUpperCase()}
        </UserAvatar>
      )}

      <p>
        {recipient?.docs?.[0]?.data()?.username
          ? recipient?.docs?.[0]?.data()?.username
          : getRecipientEmail(chat?.data()?.users, user?.email)}
      </p>
    </ChatContainer>
  );
};
const ChatContainer = styled.div`
  padding: 10px 10px;
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  border-bottom: 0.1px solid;
  border-bottom-color: ${({ theme }) => theme.dark.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.dark.headerColor};
  }

  & p {
    font-size: 14px;
    font-weight: 500;
  }
`;
export default Chat;
