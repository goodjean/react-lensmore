import React, { useEffect, useState } from "react";
import SearchApi from "../apis/searchApi";
import HotKeywordItem from "../components/HotKeywordItem";
import { IHotKeyword } from "../types/lens";
import styled from "styled-components";

const HotKeywordListStyle = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

function HotSearchKeywordListContainer() {
  const [hotKeywords, setHotKeywords] = useState<IHotKeyword[]>([]);

  useEffect(() => {
    (async () => {
      const searchApi = new SearchApi();
      const hotKeywordList = await searchApi.getLenslistByHotKeyword();
      setHotKeywords(hotKeywordList);
    })();
  }, []);

  return (
    <HotKeywordListStyle>
      {hotKeywords.map((hotKeyword, index) => (
        <HotKeywordItem key={hotKeyword.id} hotKeyword={hotKeyword} index={index} />
      ))}
    </HotKeywordListStyle>
  );
}

export default HotSearchKeywordListContainer;
