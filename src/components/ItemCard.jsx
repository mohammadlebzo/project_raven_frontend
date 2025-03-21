import React from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material";

const Card = styled(Box)`
  position: relative;
  width: 17vh;
  height: 20vh;
  margin-bottom: 2vh;
  border-radius: 6px;
  box-shadow: 10px 5px 5px rgba(26, 26, 26, 0.5);

  & img {
    max-width: 100%;
    max-height: 18vh;
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

  @media screen and (min-width: 600px) {
    width: 30vh;
    height: 35vh;

    & img {
      max-height: 35vh;
    }
  }

  @media screen and (min-width: 1600px) {
    width: 30vh;
    height: 35vh;

    & img {
      height: 35vh;
    }
  }
`;

const CardSingle = styled(Card)`
  width: 100%;
  height: 30vh;

  & img {
    width: 100%;
    max-height: 100%;
  }

  @media screen and (min-width: 600px) {
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 1600px) {
    height: 45vh;

    & img {
      height: 45vh;
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

const ItemNameBox = styled(Box)`
  position: absolute;
  left: 1vh;
  top: 0;
  width: 100%;

  & p {
    font-size: 12px;
    color: white;
  }

  @media screen and (min-width: 600px) {
    & p {
      margin-top: 1vh;
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1600px) {
    & p {
      margin-top: 1vh;
      font-size: 25px;
    }
  }
`;

const PriceBox = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: right;
  right: 1vh;
  bottom: 0;

  & img {
    width: 20%;
    height: 20%;
  }

  & p {
    margin: 0;
    margin-top: 2px;
  }

  @media screen and (min-width: 600px) {
    bottom: 1vh;

    & img {
      width: 15%;
      height: 15%;
    }

    & p {
      margin-top: 0.5vh;
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1600px) {
    & img {
      width: 15%;
      height: 15%;
    }

    & p {
      font-size: 25px;
    }
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

export default function ItemCard({ items, type }) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {type === "multi" && (
        <SpaceBetweenBox>
          {items?.map((item) => (
            <Card
              key={item?.id}
              onClick={() => navigate(`details/${item?.id}`)}
            >
              <img src={`/items/${item?.title}.webp`} alt="" />

              <ItemNameBox>
                <p>{item?.title}</p>
              </ItemNameBox>

              <ChipBox>
                <Chip label={item?.location} />
              </ChipBox>

              <PriceBox>
                <img src="/coin-icon.png" alt="" />
                <p>{item?.price}</p>
              </PriceBox>
            </Card>
          ))}
        </SpaceBetweenBox>
      )}

      {type !== "multi" && (
        <CardSingle>
          <img src={`/items/${items[0]?.title}.webp`} alt="" />

          <ChipBox>
            <Chip label={items[0]?.location} />
          </ChipBox>
        </CardSingle>
      )}
    </React.Fragment>
  );
}
