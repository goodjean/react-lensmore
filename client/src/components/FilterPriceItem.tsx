import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPrice, IPrices } from "../types/filter";
import styled from "styled-components";

const PriceItemStyle = styled.li`
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

interface PriceItemProps {
  price: IPrices;
  priceFilterList: IPrice[];
  setPriceFilterList: Dispatch<SetStateAction<IPrice[]>>;
}

function FilterPriceItem({ price, priceFilterList, setPriceFilterList }: PriceItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const found = priceFilterList.find((p) => p.id === price.id);
    if (!found) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [priceFilterList, price.id]);

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
    <PriceItemStyle onClick={setPrice}>
      {!isActive ? <div className="none-active">{price.text}</div> : <div className="active">{price.text}</div>}
    </PriceItemStyle>
  );
}

export default FilterPriceItem;
