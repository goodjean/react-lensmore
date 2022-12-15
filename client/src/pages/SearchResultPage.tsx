import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchApi from "../apis/searchApi";
import LenslistItem from "../components/LenslistItem";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
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
        {lensItemsByKeyword.length ? (
          <div>
            <h4>검색결과</h4>
            {lensItemsByKeyword.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} />
            ))}
          </div>
        ) : (
          <div>
            <img
              src="https://o-lens.com/assets/images/common/ico-i2.png"
              alt="no-data"
              style={{ width: 40 }}
            />
            <h3>검색결과가 없습니다.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
