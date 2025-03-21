import React, { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

import { JwtTokenContext } from "../context/JwtToken";

const FormBox = styled(Box)`
  padding: 2vh;
  padding-top: 6vh;

  & button {
    width: 100%;
    border-radius: 30px;
  }

  & p {
    text-align: center;
    color: white;
  }

  @media screen and (min-width: 600px) {
    padding: 0;
    padding-top: 6%;
  }

  @media screen and (min-width: 1600px) {
    padding: 0;
    padding-top: 10%;
    padding-right: 5%;
  }
`;

const FullTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 1vh;

  & label,
  input {
    color: rgb(209, 209, 209);
  }
`;

const ImageBox = styled(Box)`
  position: relative;
  padding-top: 2vh;
  padding-left: 20%;
  padding-right: 20%;
  width: 100%;
  height: 20vh;

  & img {
    position: absolute;
    width: 40%;
    height: 80%;
  }

  @media screen and (min-width: 600px) {
    padding: 0;
    width: 40%;

    & img {
      top: 70%;
      width: 50%;
      height: 100%;
    }
  }
`;

const MainBox = styled(Box)`
  width: 100%;
  height: 100vh;
  background-image: url(/background-vector.jpg);
  background-size: contain;

  &::before {
    content: "";
    position: absolute;
    height: 82vh;
    top: 26vh;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: sepia(40%);
  }

  @media screen and (min-width: 600px) {
    display: flex;
    justify-content: space-between;
    padding: 10%;

    &::before {
      height: 100vh;
      top: 8vh;
      left: 40%;
    }
  }
`;

export default function Login() {
  const { jwtLogin } = useContext(JwtTokenContext);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let body = {
      username: data.username,
      password: data.password,
      grant_type: "password",
    };

    jwtLogin(body);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      navigate("/listing");
    }
  }, [jwtLogin]);

  return (
    <MainBox>
      <ImageBox>
        <img src="/92031.png" />
      </ImageBox>

      <FormBox>
        <p>Sign-in To Project Raven</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullTextField
            id="username"
            label="Username"
            variant="filled"
            {...register("username")}
          />
          <FullTextField
            id="password"
            label="Password"
            variant="filled"
            {...register("password")}
          />
          <Button type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </form>
        <p>Forgot Password ?</p>
      </FormBox>
    </MainBox>
  );
}
