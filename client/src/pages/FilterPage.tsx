import React, { useState } from "react";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import FilterContainer from "../containers/FilterContainer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FilterPageStyle = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    width: 100%;
    height: 30%;
    padding: 7px;
    margin-top: 50px;
    border-radius: 8px;
    border-color: lightgray;
    background-color: black;
    color: white;
    font-size: 18px;
  }
`;

interface SetConditionProps {
  states: string[];
  category: string;
  setStates: React.Dispatch<React.SetStateAction<string[]>>;
}

function FilterPage() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();
  const navigate = useNavigate();
  const title = "Filter";
  const periodClassifis = ["원데이", "2주/한달착용", "장기착용"];
  const colors = ["브라운", "그레이", "블랙", "초코", "핑크", "블루", "그린"];
  const graphics = ["11.9 ~ 13.0", "13.1 ~ 13.6", "13.7 ~"];
  const prices = ["5000 ~ 10000원대", "20000원대", "30000원대 ~"];
  const brands = ["오렌즈", "렌즈미", "렌즈타운"];
  const [periodStates, setPeriodStates] = useState<string[]>([]);
  const [colorStates, setColorStates] = useState<string[]>([]);
  const [graphicStates, setGraphicStates] = useState<string[]>([]);
  const [priceStates, setPriceStates] = useState<string[]>([]);
  const [brandStates, setBrandStates] = useState<string[]>([]);

  function clickButton() {
    navigate("/filter/results", {
      state: [
        periodStates,
        colorStates,
        graphicStates,
        priceStates,
        brandStates,
      ],
    });
  }

  function setCondition(data: SetConditionProps) {
    const condition = data.states.find((state) => state === data.category);

    if (!condition) {
      data.setStates((prev) => [...prev, data.category]);
    } else {
      data.setStates(data.states.filter((state) => state !== data.category));
    }
  }

  function clickPeriod(category: string) {
    const data = { states: periodStates, category, setStates: setPeriodStates };
    setCondition(data);
  }

  function clickColor(category: string) {
    const data = { states: colorStates, category, setStates: setColorStates };
    setCondition(data);
  }

  function clickGraphic(category: string) {
    const data = {
      states: graphicStates,
      category,
      setStates: setGraphicStates,
    };
    setCondition(data);
  }

  function clickPrice(category: string) {
    const data = { states: priceStates, category, setStates: setPriceStates };
    setCondition(data);
  }

  function clickBrand(category: string) {
    const data = { states: brandStates, category, setStates: setBrandStates };
    setCondition(data);
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={title} />
        <FilterPageStyle>
          <FilterContainer
            title="사용구분"
            categories={periodClassifis}
            onClick={clickPeriod}
          />
          <FilterContainer
            title="컬러"
            categories={colors}
            onClick={clickColor}
          />
          <FilterContainer
            title="직경"
            categories={graphics}
            onClick={clickGraphic}
          />
          <FilterContainer
            title="가격"
            categories={prices}
            onClick={clickPrice}
          />
          <FilterContainer
            title="브랜드"
            categories={brands}
            onClick={clickBrand}
          />
          <button onClick={clickButton}>검색</button>
        </FilterPageStyle>
      </div>
    </div>
  );
}

export default FilterPage;
