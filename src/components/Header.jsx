import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

import { JwtTokenContext } from "../context/JwtToken";

const HerderBox = styled(Box)`
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
  background-color: rgb(26, 26, 26);
  padding: 2vh;
  padding-bottom: 0px;
`;

const LogoBox = styled(Box)`
  position: relative;
  width: 20vh;
  height: 10vh;

  & img {
    position: absolute;
    top: -3vh;
    width: 100%;
    height: 100%;
    margin-bottom: 5vh;
    border-radius: 10px;
  }
`;

const LogoutButton = styled(Button)`
  margin-bottom: 1vh;
`;

const PlaceholderBox = styled(Box)`
  width: 4vh;
  height: 4vh;
  background-color: rgb(209, 209, 209);
  border-radius: 30px;
`;

export default function Header() {
  const { token, logoutHandler } = useContext(JwtTokenContext);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <HerderBox>
        <PlaceholderBox />

        <LogoBox>
          <img src="/raven-logo.png" alt="" />
        </LogoBox>

        {!token && <PlaceholderBox />}

        {token && (
          <LogoutButton
            variant="outlined"
            color="secondary"
            onClick={() => logoutHandler().then(() => navigate("/"))}
          >
            Logout
          </LogoutButton>
        )}
      </HerderBox>
    </React.Fragment>
  );
}
