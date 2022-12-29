import React, { Dispatch, SetStateAction, useState } from "react";
import { IDays } from "../../types/lens";

interface PeriodItemProps {
  period: IDays;
  periodFilterList: string[];
  setPeriodFilterList: Dispatch<SetStateAction<string[]>>;
}

function PeriodItem({ period, periodFilterList, setPeriodFilterList }: PeriodItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

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
    <div onClick={setPeriod}>
      {!isActive ? (
        <div className="none-active" style={{ color: "black" }}>
          {period.ko}
        </div>
      ) : (
        <div className="active" style={{ color: "blue" }}>
          {period.ko}
        </div>
      )}
    </div>
  );
}

export default PeriodItem;
