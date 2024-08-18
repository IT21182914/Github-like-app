import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // <-- This is important for Tailwind to work

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
