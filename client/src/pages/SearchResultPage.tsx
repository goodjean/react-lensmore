import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchApi from "../apis/searchApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import LensResultListContainer from "../containers/LensResultListContainer";
import { ILensItem } from "../types/lens";

function SearchResultsPage() {
  const { name } = useParams();
  const [lensItemsByKeyword, setLensItemsByKeyword] = useState<ILensItem[]>([]);

  if (!name) {
    // eslint-disable-next-line no-throw-literal
    throw "cannot find";
  }

  useEffect(() => {
    (async () => {
      const searchApi = new SearchApi();
      const lensItems = await searchApi.getLensitemListByKeyword(name);
      setLensItemsByKeyword(lensItems);
    })();
  }, [name]);

  // query의 name 을 활용해서 해당하는 데이터 리스트 가져오기
  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={name} />
        <LensResultListContainer lensList={lensItemsByKeyword} />
      </div>
    </div>
  );
}

export default SearchResultsPage;
