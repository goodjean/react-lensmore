import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IGraphic, IGraphics } from "../types/filter";
import styled from "styled-components";

const GraphicItemStyle = styled.li`
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

interface GraphicItemProps {
  graphic: IGraphics;
  graphicFilterList: IGraphic[];
  setGraphicFilterList: Dispatch<SetStateAction<IGraphic[]>>;
}

function FilterGraphicItem({ graphic, graphicFilterList, setGraphicFilterList }: GraphicItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const found = graphicFilterList.find((g) => g.id === graphic.id);
    if (!found) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [graphicFilterList, graphic.id]);

  function setGraphic() {
    const found = graphicFilterList.find((g) => g.id === graphic.id);

    if (found) {
      const graphicIds = graphicFilterList.filter((g) => g.id !== graphic.id);
      setGraphicFilterList(graphicIds);
      setIsActive(false);
    } else {
      setGraphicFilterList((prev) => [...prev, { id: graphic.id, min: graphic.min, max: graphic.max }]);
      setIsActive(true);
    }
  }

  return (
    <GraphicItemStyle onClick={setGraphic}>
      {!isActive ? <div className="none-active">{graphic.text}</div> : <div className="active">{graphic.text}</div>}
    </GraphicItemStyle>
  );
}

export default FilterGraphicItem;
