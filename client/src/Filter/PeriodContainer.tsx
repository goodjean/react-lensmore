import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import { IDays } from "../types/lens";
import PeriodItem from "./compos/PeriodItem";

interface PeriodContainerProps {
  setPeriods: Dispatch<SetStateAction<string[]>>;
}

function PeriodContainer({ setPeriods }: PeriodContainerProps) {
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
      setPeriods(periodStates.map((period) => period.en));
    } else {
      setPeriods(periodFilterList);
    }
  }, [setPeriods, periodFilterList, periodStates]);

  return (
    <div>
      {periodStates.map((period) => (
        <PeriodItem
          key={period.id}
          period={period}
          periodFilterList={periodFilterList}
          setPeriodFilterList={setPeriodFilterList}
        />
      ))}
    </div>
  );
}

export default PeriodContainer;
