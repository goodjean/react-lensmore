import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import MainPage from "../pages/MainPage";
import LensDetailPage from "../pages/LensDetailPage";
import GlobalStyle from "../components/GlobalStyle";
import SearchPage from "../pages/SearchPage";
import SearchResultPage from "../pages/SearchResultPage";
import MenuPage from "../pages/MenuPage";
import DaysLensPage from "../pages/DaysLensPage";
import MyPage from "../pages/MyPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import FilterPage from "../pages/FilterPage";
import FilterResultPage from "../pages/FilterResultPage";
import BrandPage from "../pages/BrandPage";
import WishlistPage from "../pages/WishlistPage";

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
          <Route path="/menu/lens-list/:period" element={<DaysLensPage />} />
          <Route path="/menu/brand" element={<BrandPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
