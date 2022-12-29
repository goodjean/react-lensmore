import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PriceItem from "./compos/PriceItem";
import { IPrice, IPrices } from "./filterType/filter";

interface PriceContainerProps {
  setPrices: Dispatch<SetStateAction<{ min: number; max: number; isPositive: boolean }[]>>;
}

function PriceContainer({ setPrices }: PriceContainerProps) {
  const [priceStates, setPriceStates] = useState<IPrices[]>([
    { id: 1, text: "5000원 ~ 1만원대", min: 5000, max: 19999 },
    { id: 2, text: "2만원대", min: 20000, max: 29999 },
    { id: 3, text: "3만원 이상", min: 30000, max: 9999999 },
  ]);
  const [priceFilterList, setPriceFilterList] = useState<IPrice[]>([]);

  useEffect(() => {
    const idArr = priceFilterList.map((price) => price.id);
    if (idArr.includes(1 && 3) && idArr.length === 2 && !idArr.includes(2)) {
      setPrices([{ min: 20000, max: 29999, isPositive: false }]);
      console.log("hi");
    } else if (priceFilterList.length === 0) {
      setPrices([{ min: priceStates[0].min, max: priceStates[2].max, isPositive: true }]);
    } else {
      const minArr = priceFilterList.map((p) => p.min);
      const maxArr = priceFilterList.map((p) => p.max);
      minArr.sort(function (a, b) {
        return a - b;
      });
      maxArr.sort(function (a, b) {
        return b - a;
      });
      setPrices([{ min: minArr[0], max: maxArr[0], isPositive: true }]);
    }
  }, [setPrices, priceFilterList]);

  return (
    <div>
      {priceStates.map((price) => (
        <PriceItem
          key={price.id}
          price={price}
          priceFilterList={priceFilterList}
          setPriceFilterList={setPriceFilterList}
        />
      ))}
    </div>
  );
}

export default PriceContainer;
