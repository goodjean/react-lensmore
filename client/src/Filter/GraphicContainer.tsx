import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import GraphicItem from "./compos/GraphicItem";
import { IGraphics, IGraphic } from "./filterType/filter";

interface GraphicContainerProps {
  setGraphics: Dispatch<SetStateAction<{ min: number; max: number; isPositive: boolean }[]>>;
}

function GraphicContainer({ setGraphics }: GraphicContainerProps) {
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

  return (
    <div>
      {graphicStates.map((graphic) => (
        <GraphicItem
          key={graphic.id}
          graphic={graphic}
          graphicFilterList={graphicFilterList}
          setGraphicFilterList={setGraphicFilterList}
        />
      ))}
    </div>
  );
}

export default GraphicContainer;
