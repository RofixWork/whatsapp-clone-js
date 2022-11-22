import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserAvatar } from "../styledComponents/UserAvatar";
import { BsEmojiSmile } from "react-icons/bs";
import Message from "./Message";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import HeaderChat from "./HeaderChat";
import EmojiPicker from "emoji-picker-react";

const ChatScreen = () => {
  const endDiv = useRef(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { id } = useParams();
  const [user] = useAuthState(auth);
  // get focument by id
  const docRef = doc(db, "chats", id);
  const [chatSnapshot] = useDocument(docRef);
  const users = chatSnapshot?.data()?.users;

  // send message
  function sendMessage(e) {
    // e.preventDefault();

    if (!message.trim()) return false;
    // update last seeen
    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    // add message in firebase
    const ref = doc(db, "chats", id);
    addDoc(collection(ref, "messages"), {
      message,
      image: user?.photoURL,
      username: user?.displayName,
      email: user?.email,
      timestamp: serverTimestamp(),
    });

    setMessage("");

    endDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Container>
      <ChatHeader>
        {chatSnapshot && <HeaderChat users={users} user={user} />}
      </ChatHeader>
      <MessageArea>
        {/* message */}
        <Message id={id} user={user} endDiv={endDiv} />
        {/* message */}
      </MessageArea>
      <InputChat>
        {showEmoji && (
          <div className="emoji_picker">
            <EmojiPicker
              theme="dark"
              width={300}
              onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
            />
          </div>
        )}
        <BsEmojiSmile
          onClick={() => setShowEmoji((prev) => !prev)}
          fontSize={25}
          className="icon"
        />
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setShowEmoji(false);
              sendMessage();
            }
          }}
          type="text"
          placeholder="Write message here..."
        />
      </InputChat>
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const ChatHeader = styled.div`
  background-color: ${({ theme }) => theme.dark.headerColor};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  gap: 8px;

  & p {
    font-size: 14px;
    font-weight: 600;
    color: white;
  }
`;
const MessageArea = styled.div`
  flex-grow: 1;
  height: 0;
  background-image: url("/images/chat.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.dark.scroll};
  }
`;
const InputChat = styled.div`
  background-color: ${({ theme }) => theme.dark.headerColor};
  padding: 8px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;

  & .emoji_picker {
    position: absolute;
    bottom: 50px;
    left: 10px;
  }

  & .icon {
    cursor: pointer;
    color: white;
  }

  & input {
    width: 100%;
    display: block;
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.dark.chatColor};
    font-size: 14px;
    border-radius: 8px;
    color: white;
  }
`;

export default ChatScreen;
