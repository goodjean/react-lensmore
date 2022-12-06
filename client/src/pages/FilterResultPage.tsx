import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterApi from "../apis/filterApi";
import { IFilterLens } from "../types/lens";
// import FilterApi from "../apis/filterApi";

function FilterResultPage() {
  const [filterLenslist, setFilterLenslist] = useState<IFilterLens[]>([]);
  const { state } = useLocation();
  console.log(filterLenslist);

  const period: string[] = state[0];
  const color: string[] = state[1];
  const graphic: string[] = state[2];
  const price: string[] = state[3];
  const brand: string[] = state[4];

  useEffect(() => {
    (async () => {
      const filterApi = new FilterApi();
      const lensList = await filterApi.getFilteredLensList(
        period,
        color,
        graphic,
        price,
        brand
      );
      setFilterLenslist(lensList);
    })();
  }, []);

  return (
    <div>
      {filterLenslist.map((lens) => (
        <li key={lens.id}>{lens.name}</li>
      ))}
    </div>
  );
}

export default FilterResultPage;
