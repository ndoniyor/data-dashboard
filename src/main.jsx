import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "../routes/Layout";
import HeroView from "../components/HeroInfo";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route
            index={false}
            path="/heroInfo/:charID"
            element={<HeroView />}
          />
          <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
                <Link to="/">Back to Home</Link>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
