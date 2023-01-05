import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import FilterGraphicItem from "../components/FilterGraphicItem";
import { IGraphics, IGraphic } from "../types/filter";

const GraphicContainerStyle = styled.div`
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

interface GraphicContainerProps {
  setGraphics: Dispatch<SetStateAction<{ min: number; max: number; isPositive: boolean }[]>>;
}

function FilterGraphicContainer({ setGraphics }: GraphicContainerProps) {
  const [graphicStates, setGraphicStates] = useState<IGraphics[]>([
    { id: 1, text: "11.9 ~ 13.0", min: 11.9, max: 13.0 },
    { id: 2, text: "13.1 ~ 13.6", min: 13.1, max: 13.6 },
    { id: 3, text: "13.7 ~", min: 13.7, max: 99.9 },
  ]);
  const [graphicFilterList, setGraphicFilterList] = useState<IGraphic[]>([]);

  useEffect(() => {
    const idArr = graphicFilterList.map((graphic) => graphic.id);
    if (idArr.includes(1 && 3) && idArr.length === 2 && !idArr.includes(2)) {
      setGraphics([{ min: 13.1, max: 13.6, isPositive: false }]);
      console.log("hi");
    } else if (graphicFilterList.length === 0) {
      setGraphics([{ min: graphicStates[0].min, max: graphicStates[2].max, isPositive: true }]);
    } else {
      const minArr = graphicFilterList.map((g) => g.min);
      const maxArr = graphicFilterList.map((g) => g.max);
      minArr.sort(function (a, b) {
        return a - b;
      });
      maxArr.sort(function (a, b) {
        return b - a;
      });
      setGraphics([{ min: minArr[0], max: maxArr[0], isPositive: true }]);
    }
  }, [setGraphics, graphicFilterList, graphicStates]);

  function clickAll() {
    if (graphicFilterList.length === graphicStates.length) {
      setGraphicFilterList([]);
    } else {
      setGraphicFilterList(graphicStates.map((g) => ({ id: g.id, min: g.min, max: g.max })));
    }
  }

  return (
    <GraphicContainerStyle>
      <div className="title-headerbox">
        <h3>직경</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {graphicStates.map((graphic) => (
          <FilterGraphicItem
            key={graphic.id}
            graphic={graphic}
            graphicFilterList={graphicFilterList}
            setGraphicFilterList={setGraphicFilterList}
          />
        ))}
      </ul>
    </GraphicContainerStyle>
  );
}

export default FilterGraphicContainer;
