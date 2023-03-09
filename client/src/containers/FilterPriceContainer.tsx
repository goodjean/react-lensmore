import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import FilterPriceItem from "../components/FilterPriceItem";
import { IisPositiveCondi, IMinMax, IMinMaxText } from "../types/filter";

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
      width: 14%;
      height: 100%;
      padding-top: 10px;
      text-align: end;
      cursor: pointer;
    }
  }
`;

interface PriceContainerProps {
  setPrices: Dispatch<SetStateAction<IisPositiveCondi[]>>;
  filterSorting: (
    someFilterList: IMinMax[],
    setFilters: Dispatch<SetStateAction<IisPositiveCondi[]>>,
    someFilterStates: IMinMaxText[],
    minValue: number,
    maxValue: number
  ) => void;
}

function FilterPriceContainer({ setPrices, filterSorting }: PriceContainerProps) {
  const [priceStates, setPriceStates] = useState<IMinMaxText[]>([
    { id: 1, text: "5000원 ~ 1만원대", min: 5000, max: 19999 },
    { id: 2, text: "2만원대", min: 20000, max: 29999 },
    { id: 3, text: "3만원 이상", min: 30000, max: 9999999 },
  ]);
  const [priceFilterList, setPriceFilterList] = useState<IMinMax[]>([]);

  useEffect(() => {
    filterSorting(priceFilterList, setPrices, priceStates, 20000, 29999);
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
