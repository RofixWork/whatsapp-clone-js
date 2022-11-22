import { collection, doc, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import db from "../firebase";
import TimeAgo from "timeago-react";
import { BsArrowDown } from "react-icons/bs";
const Message = ({ id, user, endDiv }) => {
  const docRef = doc(db, "chats", id);
  const q = query(collection(docRef, "messages"), orderBy("timestamp", "asc"));
  const [messagesSnapshot] = useCollection(q);

  // scroll down
  useEffect(() => {
    endDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return (
    <MessageContainer>
      {messagesSnapshot &&
        messagesSnapshot?.docs?.map((msg) => {
          return (
            <MessageContent
              key={msg?.id}
              direction={`${
                msg?.data()?.email === user?.email ? "right" : "left"
              }`}
            >
              <p>{msg?.data()?.message}</p>
              <h5>
                {
                  <TimeAgo
                    datetime={msg?.data()?.timestamp?.toDate()}
                    live={false}
                  />
                }
              </h5>
            </MessageContent>
          );
        })}
      <div ref={endDiv}></div>
    </MessageContainer>
  );
};
const MessageContainer = styled.div`
  padding: 10px 14px 90px 14px;
  position: relative;
`;
const MessageContent = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.dark.headerColor};
  border-radius: 4px 5px;
  padding: 10px;
  width: fit-content;
  max-width: 600px;
  margin-left: ${({ direction }) => (direction === "right" ? "auto" : "none")};
  margin-right: ${({ direction }) => (direction === "left" ? "auto" : "none")};
  margin-block: 14px;

  & p {
    font-size: 14px;
    font-weight: 600;
  }
  & h5 {
    font-size: 11px;
    margin-top: 4px;
    font-weight: 500;
    text-align: ${({ direction }) =>
      direction === "right" ? "right" : "left"};
    color: #ccc;
  }
`;

export default Message;
