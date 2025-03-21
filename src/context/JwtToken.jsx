import React, { createContext, useState } from "react";

import axios from "axios";

export const JwtTokenContext = createContext(null);

export const JwtTokenContextProvider = ({ children }) => {
  const [token, setToken] = useState();

  const jwtLogin = (body) => {
    const path = `http://localhost:8000/api/v1/token/`;
    const headers = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(path, body, { headers: headers })
      .then((res) => {
        setToken(res?.data?.access_token);
        localStorage.setItem("token", res?.data?.access_token)
      })
      .catch((err) => console.log(err));

    return token;
  };

  const jwtLocalCheck = () => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
        setToken(localToken)
    }
    return localToken;
  };

  const logoutHandler = async () => {
    localStorage.clear();
    setToken("")
  };

  const value = {
    token,
    jwtLogin,
    jwtLocalCheck,
    logoutHandler,
  };

  return (
    <JwtTokenContext.Provider value={value}>
      {children}
    </JwtTokenContext.Provider>
  );
};
