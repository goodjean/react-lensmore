import React, { useEffect, useState } from "react";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import FilterContainer from "../containers/FilterContainer";
import LensApi from "../apis/lensApi";
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
    width: 99%;
    height: 30%;
    padding: 7px;
    margin-top: 60px;
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
  const navigate = useNavigate();
  const title = "Filter";
  const [periods, setPeriods] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const graphics = ["11.9 ~ 13.0", "13.1 ~ 13.6", "13.7 ~"];
  const prices = ["5000 ~ 10000원", "10000 ~ 30000원", "30000원 이상"];
  const [brands, setBrands] = useState<string[]>([]);

  const [periodStates, setPeriodStates] = useState<string[]>([]);
  const [colorStates, setColorStates] = useState<string[]>([]);
  const [graphicStates, setGraphicStates] = useState<string[]>([]);
  const [priceStates, setPriceStates] = useState<string[]>([]);
  const [brandStates, setBrandStates] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lensDayList = await lensApi.getLensDayList();
      const lensColorList = await lensApi.getLensColorList();
      const lensBrandList = await lensApi.getLensBrandList();
      setPeriods(lensDayList.map((day) => day.ko));
      setColors(lensColorList.map((color) => color.color));
      setBrands(lensBrandList.map((brand) => brand.ko_name));
    })();
  }, []);

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

  function setCondition(data: SetConditionProps, title: string) {
    const condition = data.states.find((state) => state === data.category);
    if (!condition) {
      if (title === "직경" || title === "가격") {
        data.setStates([data.category]);
      } else {
        data.setStates((prev) => [...prev, data.category]);
      }
    } else {
      data.setStates(data.states.filter((state) => state !== data.category));
    }
  }

  function clickPeriod(category: string) {
    const data = { states: periodStates, category, setStates: setPeriodStates };
    setCondition(data, "사용구분");
  }

  function clickColor(category: string) {
    const data = { states: colorStates, category, setStates: setColorStates };
    setCondition(data, "컬러");
  }

  function clickGraphic(category: string) {
    const data = {
      states: graphicStates,
      category,
      setStates: setGraphicStates,
    };
    setCondition(data, "직경");
  }

  function clickPrice(category: string) {
    const data = { states: priceStates, category, setStates: setPriceStates };
    setCondition(data, "가격");
  }

  function clickBrand(category: string) {
    const data = { states: brandStates, category, setStates: setBrandStates };
    setCondition(data, "브랜드");
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={title} />
        <FilterPageStyle>
          <FilterContainer
            title="사용구분"
            categories={periods}
            states={periodStates}
            onClick={clickPeriod}
            setStates={setPeriodStates}
          />
          <FilterContainer
            title="컬러"
            categories={colors}
            states={colorStates}
            onClick={clickColor}
            setStates={setColorStates}
          />
          <FilterContainer
            title="직경"
            categories={graphics}
            states={graphicStates}
            onClick={clickGraphic}
            setStates={setGraphicStates}
          />
          <FilterContainer
            title="가격"
            categories={prices}
            states={priceStates}
            onClick={clickPrice}
            setStates={setPriceStates}
          />
          <FilterContainer
            title="브랜드"
            categories={brands}
            states={brandStates}
            onClick={clickBrand}
            setStates={setBrandStates}
          />
          <button onClick={clickButton}>검색</button>
        </FilterPageStyle>
      </div>
    </div>
  );
}

export default FilterPage;
