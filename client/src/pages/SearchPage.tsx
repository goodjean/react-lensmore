import React from "react";
import SearchNavBar from "../components/SearchNavBar";
import styled from "styled-components";
import HotSearchKeywordListContainer from "../containers/HotSearchKeywordListContainer";

const SearchPageMainStyle = styled.main`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  .hot-keyword {
    font-size: 18px;
    font-weight: 800;
    padding: 30px 32px 18px;
    border-bottom: 2px solid #e1e1e1;
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
