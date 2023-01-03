import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDays } from "../types/lens";
import styled from "styled-components";

const PeriodItemStyle = styled.li`
  width: 30%;
  height: 100%;
  // background-color: green;

  .none-active {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    color: #aeaeae;
    font-weight: bold;
    cursor: pointer;
  }

  .active {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: black;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 8px;
    cursor: pointer;
  }
`;

interface PeriodItemProps {
  period: IDays;
  periodFilterList: string[];
  setPeriodFilterList: Dispatch<SetStateAction<string[]>>;
}

function FilterPeriodItem({ period, periodFilterList, setPeriodFilterList }: PeriodItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const found = periodFilterList.find((p) => p === period.en);
    if (!found) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [periodFilterList, period.en]);

  function setPeriod() {
    const found = periodFilterList.find((p) => p === period.en);

    if (found) {
      const periodEn = periodFilterList.filter((p) => p !== period.en);
      setPeriodFilterList(periodEn);
      setIsActive(false);
    } else {
      setPeriodFilterList((prev) => [...prev, period.en]);
      setIsActive(true);
    }
  }

  return (
    <PeriodItemStyle onClick={setPeriod}>
      {!isActive ? <div className="none-active">{period.ko}</div> : <div className="active">{period.ko}</div>}
    </PeriodItemStyle>
  );
}

export default FilterPeriodItem;
