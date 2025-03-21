import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { styled } from "@mui/material";

import { JwtTokenContext } from "../context/JwtToken";
import ItemCard from "../components/ItemCard";

const CenterBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 25%;
  }
`;

const FilterBox = styled(Box)`
  display: flex;
  justify-content: right;
  padding-top: 2vh;
  padding-right: 5vh;
  padding-left: 5vh;
  width: 100%;
`;

export default function Home() {
  const { token } = useContext(JwtTokenContext);

  const [filter, setFilter] = useState("");
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [totalOfItems, setTotalOfItems] = useState(1);

  let pageSize = 10;

  useEffect(() => {
    const path =
      "http://localhost:8000/api/v1/item/?page_number=0&page_size=10";
    let headers = {
      Authorization: "Bearer " + token,
    };

    console.log(token, headers);
    const params = {
      page_number: page,
      page_size: pageSize,
      location: filter,
    };

    const fetch = () => {
      axios
        .get(path, { headers: headers, params: params })
        .then((items) => {
          setItems(items?.data?.items);
          setTotalOfItems(items?.data?.full_total);
          console.log(items?.data);
        })
        .catch((err) => console.log(err));
    };

    fetch();
  }, [page, filter]);

  return (
    <React.Fragment>
      <FilterBox>
        <CustomFormControl variant="filled">
          <InputLabel id="simple-select-filled-label">
            Location Filter
          </InputLabel>
          <Select
            labelId="simple-select-filled-label"
            id="simple-select-filled"
            onChange={(e, val) => {
              console.log(val.props.value);

              setFilter(val.props.value);
              setPage(1);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"JO"}>Jordan</MenuItem>
            <MenuItem value={"SA"}>Saudi Arabia</MenuItem>
          </Select>
        </CustomFormControl>
      </FilterBox>

      <ItemCard items={items} type="multi" />

      <CenterBox>
        <Pagination
          count={Math.ceil(totalOfItems / pageSize)}
          page={page}
          onChange={(e, val) => {
            console.log(val);
            console.log(page);

            setPage(val);
          }}
        />
      </CenterBox>
    </React.Fragment>
  );
}
