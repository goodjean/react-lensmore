import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import MainPage from "../pages/MainPage";
import LensDetailPage from "../pages/LensDetailPage";
import GlobalStyle from "../components/GlobalStyle";
import SearchPage from "../pages/SearchPage";
import ResultsPage from "../pages/ResultsPage";

export default function Router() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/detail/:id" element={<LensDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/results/:name" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
