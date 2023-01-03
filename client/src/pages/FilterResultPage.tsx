import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterApi from "../apis/filterApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import LensResultListContainer from "../containers/LensResultListContainer";
import { IFilterLensTest } from "../types/lens";

function FilterResultPage() {
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
      const lensList = await filterApi.getFilteredLensList(period, color, graphic, price, brand);
      setFilterLenslist(lensList);
    })();
  }, [period, color, graphic, price, brand]);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="필터결과" />
        <LensResultListContainer lensList={filterLenslist} />
      </div>
    </div>
  );
}

export default FilterResultPage;
