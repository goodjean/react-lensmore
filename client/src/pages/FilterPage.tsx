import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import FilterBrandContainer from "../containers/FilterBrandContainer";
import FilterColorContainer from "../containers/FilterColorContainer";
import FilterGraphicContainer from "../containers/FilterGraphicContainer";
import FilterPeriodContainer from "../containers/FilterPeriodContainer";
import FilterPriceContainer from "../containers/FilterPriceContainer";
import { IisPositiveCondi, IMinMax, IMinMaxText } from "../types/filter";

const FilterPageStyle = styled.section`
  width: 100%;
  height: 90.3%;
  padding: 35px 32px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    width: 100%;
    height: 7%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 12px;
    background-color: #000;
    padding: 6px;
    margin-top: 60px;
  }
`;

function FilterPage() {
  const navigate = useNavigate();
  const [periods, setPeriods] = useState<string[]>([]);
  const [colors, setColors] = useState<number[]>([]);
  const [graphics, setGraphics] = useState<IisPositiveCondi[]>([]); // type
  const [prices, setPrices] = useState<IisPositiveCondi[]>([]); // type
  const [brands, setBrands] = useState<number[]>([]);

  function filter() {
    navigate("/filter/results", {
      state: [periods, colors, graphics, prices, brands],
    });
  }
  // # graphic & price filter function
  function filterSorting(
    someFilterList: IMinMax[],
    setFilters: Dispatch<SetStateAction<IisPositiveCondi[]>>,
    someFilterStates: IMinMaxText[],
    minValue: number,
    maxValue: number
  ) {
    const idArr = someFilterList.map((list) => list.id);
    if (idArr.includes(1 && 3) && idArr.length === 2 && !idArr.includes(2)) {
      setFilters([{ min: minValue, max: maxValue, isPositive: false }]);
      console.log("hi");
    } else if (someFilterList.length === 0) {
      setFilters([{ min: someFilterStates[0].min, max: someFilterStates[2].max, isPositive: true }]);
    } else {
      const minArr = someFilterList.map((list) => list.min);
      const maxArr = someFilterList.map((list) => list.max);
      minArr.sort(function (a, b) {
        return a - b;
      });
      maxArr.sort(function (a, b) {
        return b - a;
      });
      setFilters([{ min: minArr[0], max: maxArr[0], isPositive: true }]);
    }
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="Filter" />
        <FilterPageStyle>
          <FilterPeriodContainer setPeriods={setPeriods} />
          <FilterColorContainer setColors={setColors} />
          <FilterGraphicContainer setGraphics={setGraphics} filterSorting={filterSorting} />
          <FilterPriceContainer setPrices={setPrices} filterSorting={filterSorting} />
          <FilterBrandContainer setBrands={setBrands} />
          <button onClick={filter}>검색</button>
        </FilterPageStyle>
      </div>
    </div>
  );
}

export default FilterPage;
