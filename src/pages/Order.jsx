import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material";

import { JwtTokenContext } from "../context/JwtToken";

const BackButtonBox = styled(Box)`
  display: flex;
  justify-content: left;
  padding: 2vh;
`;

const CardSingle = styled(Box)`
  position: relative;
  width: 100%;
  height: 40vh;
  margin-bottom: 2vh;
  border-radius: 6px;
  box-shadow: 10px 5px 5px rgba(26, 26, 26, 0.5);

  & img {
    width: 100%;
    max-height: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 6px;
    background: linear-gradient(
      to bottom,
      rgba(26, 26, 26, 0.5) 0%,
      transparent 30%,
      transparent 80%,
      rgba(26, 26, 26, 0.5) 100%
    );
  }
`;

const CenterBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  padding-right: 6vh;
  padding-left: 6vh;

  & img {
    width: 100%;
    height: 20vh;
  }

  & h3 {
    width: 100%;
    text-align: center;
  }

  @media screen and (min-width: 600px) {
    & img {
      height: 40vh;
    }
  }

  @media screen and (min-width: 1600px) {
    & h3 {
      font-size: 30px;
    }

    & p {
      font-size: 30px;
    }
  }
`;

const ChipBox = styled(Box)`
  position: absolute;
  left: 1vh;
  bottom: 0;

  & span {
    font-size: 10px;
    color: white;
  }

  @media screen and (min-width: 600px) {
    bottom: 1vh;
    & span {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1600px) {
    & span {
      font-size: 20px;
    }
  }
`;

const FlexBox = styled(Box)`
  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

const ItemIconBox = styled(Box)`
  width: 100%;
  padding: 10%;
  padding-bottom: 0;

  @media screen and (min-width: 600px) {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const ItemNameBox = styled(Box)`
  position: relative;
  width: 70%;

  & p {
    margin: 0;
    margin-top: 1vh;
    font-size: 20px;
  }

  @media screen and (min-width: 1600px) {
    & p {
      font-size: 40px;
      margin-top: 0;
    }
  }
`;

const LeftSideBox = styled(Box)`
  @media screen and (min-width: 600px) {
    width: 50%;
    padding-top: 5%;
  }
`;

const PriceBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: right;
  width: 30%;
  height: 5vh;

  & img {
    max-width: 100%;
    max-height: 100%;
  }

  & p {
    margin: 0;
    margin-top: 1vh;
  }

  @media screen and (min-width: 1600px) {
    & p {
      font-size: 30px;
      margin-top: 0.5vh;
    }
  }
`;

const RightSideBox = styled(Box)`
  @media screen and (min-width: 600px) {
    width: 40%;
    padding-top: 5%;
  }

  @media screen and (min-width: 1600px) {
    width: 40%;
    padding-top: 4%;
  }
`;

const SpaceBetweenBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 4vh;
  padding-bottom: 2vh;
  padding-right: 6vh;
  padding-left: 6vh;
`;

export default function Order() {
  const { token } = useContext(JwtTokenContext);
  const [item, setItem] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const path = `http://localhost:8000/api/v1/item/${id}`;
    let headers = {
      Authorization: "Bearer " + token,
    };

    axios.defaults.withXSRFToken = true;

    const fetch = () => {
      axios
        .get(path, { headers: headers })
        .then((res) => {
          setItem(res?.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };

    fetch();
  }, []);

  return (
    <React.Fragment>
      <BackButtonBox onClick={() => navigate("/listing")}>
        <ArrowBackIcon />
      </BackButtonBox>

      <FlexBox>
        <LeftSideBox>
          <CenterBox>
            <h3>Thank you for your purchase</h3>
          </CenterBox>

          <CenterBox>
            <img src="/raven-logo.png" alt="" />
          </CenterBox>

          <CenterBox>
            <h3>Your Project Raven transaction was successful. Thanks!</h3>
          </CenterBox>
        </LeftSideBox>

        <RightSideBox>
          <ItemIconBox>
            <CardSingle>
              <img src={`/items/${item?.title}.webp`} alt="" />

              <ChipBox>
                <Chip label={item?.location} />
              </ChipBox>
            </CardSingle>
          </ItemIconBox>
          <Box>
            <SpaceBetweenBox>
              <ItemNameBox>
                <p>{item?.title}</p>
              </ItemNameBox>

              <PriceBox>
                <img src="/coin-icon.png" alt="" />
                <p>{item?.price}</p>
              </PriceBox>
            </SpaceBetweenBox>

            <CenterBox>
              <p>{item?.description}</p>
            </CenterBox>
          </Box>
        </RightSideBox>
      </FlexBox>
    </React.Fragment>
  );
}
