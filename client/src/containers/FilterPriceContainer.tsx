import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import FilterPriceItem from "../components/FilterPriceItem";
import { IPrice, IPrices } from "../types/filter";

const PriceContainerStyle = styled.div`
  width: 100%;
  height: 14%;
  margin-top: 20px;
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

interface PriceContainerProps {
  setPrices: Dispatch<SetStateAction<{ min: number; max: number; isPositive: boolean }[]>>;
}

function FilterPriceContainer({ setPrices }: PriceContainerProps) {
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
  }, [setPrices, priceFilterList, priceStates]);

  function clickAll() {
    if (priceFilterList.length === priceStates.length) {
      setPriceFilterList([]);
    } else {
      setPriceFilterList(priceStates.map((p) => ({ id: p.id, min: p.min, max: p.max })));
    }
  }

  return (
    <PriceContainerStyle>
      <div className="title-headerbox">
        <h3>가격</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {priceStates.map((price) => (
          <FilterPriceItem
            key={price.id}
            price={price}
            priceFilterList={priceFilterList}
            setPriceFilterList={setPriceFilterList}
          />
        ))}
      </ul>
    </PriceContainerStyle>
  );
}

export default FilterPriceContainer;
