import React, { Dispatch, SetStateAction, useState } from "react";
import { IPrice, IPrices } from "../filterType/filter";

interface PriceItemProps {
  price: IPrices;
  priceFilterList: IPrice[];
  setPriceFilterList: Dispatch<SetStateAction<IPrice[]>>;
}

function PriceItem({ price, priceFilterList, setPriceFilterList }: PriceItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  function setPrice() {
    const found = priceFilterList.find((p) => p.id === price.id);

    if (found) {
      const priceIds = priceFilterList.filter((p) => p.id !== price.id);
      setPriceFilterList(priceIds);
      setIsActive(false);
    } else {
      setPriceFilterList((prev) => [...prev, { id: price.id, min: price.min, max: price.max }]);
      setIsActive(true);
    }
  }

  return (
    <div onClick={setPrice}>
      {!isActive ? (
        <div className="none-active" style={{ color: "black" }}>
          {price.text}
        </div>
      ) : (
        <div className="active" style={{ color: "blue" }}>
          {price.text}
        </div>
      )}
    </div>
  );
}

export default PriceItem;
