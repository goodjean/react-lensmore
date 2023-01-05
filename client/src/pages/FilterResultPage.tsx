import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterApi from "../apis/filterApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import LensResultListContainer from "../containers/LensResultListContainer";
import PaginationList from "../containers/PaginationList";
import { IFilterLensTest } from "../types/lens";
import styled from "styled-components";

const FilterResultPageStyle = styled.div`
  width: 100%;
  heigth: auto;
  display: flex;
  flex-direction: column;
`;

function FilterResultPage() {
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const [listCount, setListCount] = useState<number>(0);
  const [blockNum, setBlockNum] = useState(0);
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
      const lensList = await filterApi.getFilteredLensListByOffset(period, color, graphic, price, brand, page, limit);
      setFilterLenslist(lensList);
    })();
  }, [period, color, graphic, price, brand, page, limit]);

  useEffect(() => {
    (async () => {
      const filterApi = new FilterApi();
      const lensList = await filterApi.getAllFilteredLensList(period, color, graphic, price, brand);
      setListCount(lensList.length);
    })();
  }, [period, color, graphic, price, brand]);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="필터결과" />
        <FilterResultPageStyle>
          <LensResultListContainer lensList={filterLenslist} listCount={listCount} />
          <PaginationList
            limit={limit}
            page={page}
            setPage={setPage}
            blockNum={blockNum}
            setBlockNum={setBlockNum}
            listCount={listCount}
          />
        </FilterResultPageStyle>
      </div>
    </div>
  );
}

export default FilterResultPage;
