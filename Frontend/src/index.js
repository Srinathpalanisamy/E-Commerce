import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, GlobalStyles } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />

    <GlobalStyles
      styles={{
        body: {
          margin: 0,
          padding: 0,
          fontFamily: "Roboto, sans-serif",
          backgroundColor: "#f5f5f6",
        },
        "#root": {
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    />

    <App />
  </React.StrictMode>
);