import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import { IColors } from "../types/lens";
import FilterColorItem from "../components/FilterColorItem";

const ColorContainerStyle = styled.div`
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

interface ColorContainerProps {
  setColors: Dispatch<SetStateAction<number[]>>;
}

function FilterColorContainer({ setColors }: ColorContainerProps) {
  const [colorStates, setColorStates] = useState<IColors[]>([]); // DB DATA
  const [colorFilterList, setColorFilterList] = useState<number[]>([]); //임시저장소

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const colorList = await lensApi.getLensColorList();
      setColorStates(colorList);
    })();
  }, []);

  useEffect(() => {
    if (colorFilterList.length === 0) {
      setColors(colorStates.map((color) => color.id));
    } else {
      setColors(colorFilterList);
    }
  }, [setColors, colorFilterList, colorStates]);

  function clickAll() {
    if (colorFilterList.length === colorStates.length) {
      setColorFilterList([]);
    } else {
      setColorFilterList(colorStates.map((c) => c.id));
      setColors(colorStates.map((c) => c.id));
    }
  }

  return (
    <ColorContainerStyle>
      <div className="title-headerbox">
        <h3>컬러</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {colorStates.map((color) => (
          <FilterColorItem
            key={color.id}
            color={color}
            colorFilterList={colorFilterList}
            setColorFilterList={setColorFilterList}
          />
        ))}
      </ul>
    </ColorContainerStyle>
  );
}

export default FilterColorContainer;
