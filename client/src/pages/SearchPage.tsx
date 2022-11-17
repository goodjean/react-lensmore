import React from "react";
import SearchNavBar from "../components/SearchNavBar";
import styled from "styled-components";
import HotSearchKeywordListContainer from "../containers/HotSearchKeywordListContainer";

const SearchPageMainStyle = styled.main`
  width: 100%;
  text-align: center;

  .hot-keyword {
    font-size: 17px;
    font-weight: bold;
  }
`;

export default function SearchPage() {
  return (
    <div className="wrap">
      <div className="wrap-inner">
        <SearchNavBar />
        <SearchPageMainStyle>
          <div className="hot-keyword">인기검색어</div>
          <HotSearchKeywordListContainer />
        </SearchPageMainStyle>
      </div>
    </div>
  );
}
