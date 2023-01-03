import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import { IDays } from "../types/lens";
import FilterPeriodItem from "../components/FilterPeriodItem";

const PeriodContainerStyle = styled.div`
  width: 100%;
  height: 14%;
  // background-color: yellow;

  ul {
    width: 100%;
    height: 50%;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .title-headerbox {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h3 {
      width: 50%;
      height: 100%;
      padding-top: 10px;
    }

    span {
      width: 50%;
      height: 100%;
      padding-top: 10px;
      text-align: end;
      cursor: pointer;
    }
  }
`;

interface PeriodContainerProps {
  setPeriods: Dispatch<SetStateAction<string[]>>;
}

function FilterPeriodContainer({ setPeriods }: PeriodContainerProps) {
  const [periodStates, setPeriodStates] = useState<IDays[]>([]);
  const [periodFilterList, setPeriodFilterList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const periodList = await lensApi.getLensDayList();
      setPeriodStates(periodList);
    })();
  }, []);

  useEffect(() => {
    if (periodFilterList.length === 0) {
      setPeriods(periodStates.map((p) => p.en));
    } else {
      setPeriods(periodFilterList);
    }
  }, [setPeriods, periodFilterList, periodStates]); // default []

  function clickAll() {
    if (periodFilterList.length === periodStates.length) {
      setPeriodFilterList([]);
    } else {
      setPeriodFilterList(periodStates.map((p) => p.en));
      setPeriods(periodStates.map((p) => p.en));
    }
  }

  return (
    <PeriodContainerStyle>
      <div className="title-headerbox">
        <h3>사용구분</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {periodStates.map((period) => (
          <FilterPeriodItem
            key={period.id}
            period={period}
            periodFilterList={periodFilterList}
            setPeriodFilterList={setPeriodFilterList}
          />
        ))}
      </ul>
    </PeriodContainerStyle>
  );
}

export default FilterPeriodContainer;
