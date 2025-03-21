import React, { useContext, useEffect, useState } from "react";

import { useRoutes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ItemDetails from "../pages/ItemDetails";
import Order from "../pages/Order";
import { JwtTokenContext } from "../context/JwtToken";
import Page404 from "../pages/Page404";

export default function Router() {
  const { token, jwtLocalCheck } = useContext(JwtTokenContext);
  const [routes, setRoutes] = useState([
    {
      path: "/",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  const privateRoutes = {
    path: "/listing",
    children: [
      { path: "", element: <Home /> },
      { path: "details/:id", element: <ItemDetails /> },
      { path: "order/:id", element: <Order /> },
    ],
  };

  useEffect(() => {
    if (jwtLocalCheck() && routes[routes.length - 1] !== privateRoutes) {
      setRoutes((prev) => [...prev, privateRoutes]);
    }
    console.log(routes);
  }, [token]);

  let route = useRoutes(routes);

  return route;
}
