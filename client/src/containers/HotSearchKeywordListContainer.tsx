import React, { useEffect, useState } from "react";
import SearchApi from "../apis/searchApi";
import HotKeywordItem from "../components/HotKeywordItem";
import { IHotKeyword } from "../types/lens";

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
    <ul>
      {hotKeywords.map((hotKeyword, index) => (
        <HotKeywordItem key={hotKeyword.id} hotKeyword={hotKeyword} index={index} />
      ))}
    </ul>
  );
}

export default HotSearchKeywordListContainer;
