import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterApi from "../apis/filterApi";
import { IFilterLensTest } from "../types/lens";

function FTResultPage() {
  const { state } = useLocation();
  const [filterLenslist, setFilterLenslist] = useState<IFilterLensTest[]>([]);

  const period: string[] = state[0];
  const color: number[] = state[1];
  const graphic: { min: number; max: number; isPositive: boolean }[] = state[2];
  const price: { min: number; max: number; isPositive: boolean }[] = state[3];
  const brand: number[] = state[4];

  useEffect(() => {
    (async () => {
      const filterApi = new FilterApi();
      const lensList = await filterApi.getTestFilterResult(period, color, graphic, price, brand);
      setFilterLenslist(lensList);
    })();
  }, [period, color, graphic, price, brand]);

  return (
    <div>
      {filterLenslist.length === 0 ? (
        <div>검색결과 없음</div>
      ) : (
        <ul>
          {filterLenslist.map((lens) => (
            <li key={lens.id}>{lens.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FTResultPage;
