import React from "react";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
const Login = () => {
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((user) => console.log(user))
      .catch((err) => console.error(err));
  };
  return (
    <LoginContainer>
      <img src="/images/logo.png" alt="whatsapp" />
      <button onClick={signin}>signin with google</button>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.dark.chatColor};

  & img {
    height: 250px;
  }
  & button {
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    background-color: ${({ theme }) => theme.dark.headerColor};
    color: white;
  }
`;

export default Login;
