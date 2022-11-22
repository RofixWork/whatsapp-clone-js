import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
const Loading = () => {
  return (
    <Container>
      <BeatLoader color="#ffff" size={23} style={{ transform: "revert" }} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.dark.headerColor};
`;

export default Loading;
