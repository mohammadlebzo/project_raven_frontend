import React from "react";

import { BrowserRouter } from "react-router-dom";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import Router from "./router/Router";
import Header from "./components/Header";
import { JwtTokenContextProvider } from "./context/JwtToken";

import "./App.css";

export default function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: ["Pixelify Sans", "sans-serif"].join(","),
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <JwtTokenContextProvider>
          <CssBaseline />

          <Header />
          <div>
            <Router />
          </div>
        </JwtTokenContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
