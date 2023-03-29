import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "../routes/Layout";
import DetailView from "../routes/DetailView";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
