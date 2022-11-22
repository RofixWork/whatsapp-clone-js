import React from "react";
import styled from "styled-components";

const Hello = () => {
  return (
    <Container>
      <h3>Welcome to Whatsapp 😁</h3>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  flex-grow: 1;
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 3rem;

  @media screen and (max-width: 768px) {
    & {
      font-size: 2rem;
    }
  }
`;
export default Hello;
