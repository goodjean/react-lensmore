import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import FilterBrandContainer from "../containers/FilterBrandContainer";
import FilterColorContainer from "../containers/FilterColorContainer";
import FilterGraphicContainer from "../containers/FilterGraphicContainer";
import FilterPeriodContainer from "../containers/FilterPeriodContainer";
import FilterPriceContainer from "../containers/FilterPriceContainer";

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
  const [graphics, setGraphics] = useState<{ min: number; max: number; isPositive: boolean }[]>([]); // type
  const [prices, setPrices] = useState<{ min: number; max: number; isPositive: boolean }[]>([]); // type
  const [brands, setBrands] = useState<number[]>([]);

  function filter() {
    navigate("/filter/results", {
      state: [periods, colors, graphics, prices, brands],
    });
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="Filter" />
        <FilterPageStyle>
          <FilterPeriodContainer setPeriods={setPeriods} />
          <FilterColorContainer setColors={setColors} />
          <FilterGraphicContainer setGraphics={setGraphics} />
          <FilterPriceContainer setPrices={setPrices} />
          <FilterBrandContainer setBrands={setBrands} />
          <button onClick={filter}>검색</button>
        </FilterPageStyle>
      </div>
    </div>
  );
}

export default FilterPage;
