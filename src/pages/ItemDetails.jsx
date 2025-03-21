import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

import { JwtTokenContext } from "../context/JwtToken";
import ItemCard from "../components/ItemCard";

const BackButtonBox = styled(Box)`
  display: flex;
  justify-content: left;
  padding: 2vh;
`;

const CenterBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding-right: 6vh;
  padding-left: 6vh;

  & button {
    width: 100%;
    border-radius: 30px;
  }

  @media screen and (min-width: 600px) {
    & button {
      font-size: 20px;
    }

    & p {
      font-size: 25px;
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
  padding: 5vh;
  padding-bottom: 0;

  @media screen and (min-width: 600px) {
    width: 40%;
    padding: 10vh;
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

  @media screen and (min-width: 600px) {
    & p {
      margin-top: 0;
      font-size: 30px;
    }
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

  @media screen and (min-width: 600px) {
    & img {
      max-width: 100%;
      max-height: 100%;
    }

    & p {
      margin-top: 0;
      font-size: 30px;
    }
  }
`;

const RightSideBox = styled(Box)`
  @media screen and (min-width: 600px) {
    width: 60%;
    padding-top: 10%;
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

export default function ItemDetails() {
  const { token } = useContext(JwtTokenContext);
  const [item, setItem] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePurchase = () => {
    const path = `http://localhost:8000/api/v1/order/${id}`;
    let headers = {
      Authorization: "Bearer " + token,
    };

    console.log(token);

    axios
      .post(path, {}, { headers: headers })
      .then((res) => {
        if (res?.data?.id == id) {
          navigate(`/listing/order/${id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const path = `http://localhost:8000/api/v1/item/${id}`;
    let headers = {
      Authorization: "Bearer " + token,
    };

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
        <ItemIconBox>
          <ItemCard items={[item]} />
        </ItemIconBox>

        <RightSideBox>
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

          <CenterBox>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePurchase}
            >
              purchase
            </Button>
          </CenterBox>
        </RightSideBox>
      </FlexBox>
    </React.Fragment>
  );
}
