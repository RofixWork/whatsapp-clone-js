import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import Chats from "./Chats";
import { UserAvatar } from "../styledComponents/UserAvatar";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import validator from "validator";
const Sidebar = () => {
  const [user] = useAuthState(auth);

  // get my chats
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", user?.email)
  );
  const [chatsSnapshot] = useCollection(q);

  const createChat = () => {
    const userEmail = prompt(
      "Enter the email of the person you want to chat with here:"
    )
      ?.trim()
      ?.toLowerCase();

    if (!userEmail) return;

    if (!validator.isEmail(userEmail)) {
      alert("format email invalid!");
      return;
    }

    if (chatAlreadyExist(userEmail)) {
      alert("this chat already exist...");
      return;
    }

    addDoc(collection(db, "chats"), {
      users: [userEmail, user?.email],
      timestamp: serverTimestamp(),
    });
  };
  // chatAlreadyExist fn()
  const chatAlreadyExist = (email) => {
    const checkChat = chatsSnapshot?.docs?.find((chat) =>
      chat?.data()?.users?.find((userEmail) => userEmail === email)
    );

    return checkChat;
  };

  return (
    <Container>
      <Header>
        {user && <UserAvatar src={user?.photoURL} alt={user?.displayName} />}

        <div className="menu">
          <FiMoreVertical className="icon" />
          <p onClick={() => signOut(auth)}>Disconnection</p>
        </div>
      </Header>
      <InputSearch>
        <AiOutlineSearch fontSize={20} />
        <input type="text" placeholder="Search..." />
      </InputSearch>
      <StartChatButton onClick={createChat}>Start a new chat</StartChatButton>
      <Chats />
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  width: 330px;
  height: 100vh;
  background-color: ${({ theme }) => theme.dark.chatColor};
  flex-direction: column;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.dark.headerColor};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .menu {
    position: relative;

    & p {
      position: absolute;
      background-color: #fff;
      padding: 5px 10px;
      font-size: 13px;
      border-radius: 3px;
      top: 25px;
      right: 0;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    }

    &:hover > p {
      opacity: 1;
      visibility: visible;
    }
  }

  & .icon {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
`;

const InputSearch = styled.div`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.dark.headerColor};
  margin: 8px 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  border-radius: 5px;
  & input {
    background-color: transparent;
    width: 100%;
    display: block;
    color: white;
    caret-color: white;

    &::placeholder {
      font-size: 15px;
    }
  }
`;
const StartChatButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.dark.headerColor};
  text-transform: uppercase;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
`;
export default Sidebar;
