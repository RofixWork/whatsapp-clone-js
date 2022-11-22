import Avatar from "@mui/material/Avatar";
import styled from "styled-components";

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export { UserAvatar };
