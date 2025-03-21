import React from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const CenterBox = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  & h2 {
    font-size: 40px;
  }

  @media screen and (max-width: 600px) {
    & img {
      width: 50%;
    }

    & h2 {
      font-size: 25px;
    }
  }
`;

const LayoutBox = styled(Box)`
  padding-top: 10%;

  @media screen and (max-width: 600px) {
    padding-top: 50%;
  }
`;

export default function Page404() {
  const navigate = useNavigate();

  return (
    <LayoutBox>
      <CenterBox>
        <img src="/404.png" alt="" />
      </CenterBox>

      <CenterBox>
        <h2>404 Page Not Found</h2>
      </CenterBox>

      <CenterBox>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Go Back
        </Button>
      </CenterBox>
    </LayoutBox>
  );
}
