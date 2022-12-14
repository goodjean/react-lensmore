import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import MainPage from "../pages/MainPage";
import LensDetailPage from "../pages/LensDetailPage";
import GlobalStyle from "../components/GlobalStyle";
import SearchPage from "../pages/SearchPage";
import SearchResultPage from "../pages/SearchResultPage";
import FilterPage from "../pages/FilterPage";
import FilterResultPage from "../pages/FilterResultPage";
import MenuPage from "../pages/MenuPage";

export default function Router() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/detail/:id" element={<LensDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/results/:name" element={<SearchResultPage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/filter/results" element={<FilterResultPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
