import React, { Dispatch, SetStateAction, useState } from "react";
import { IGraphic, IGraphics } from "../filterType/filter";

interface GraphicItemProps {
  graphic: IGraphics;
  graphicFilterList: IGraphic[];
  setGraphicFilterList: Dispatch<SetStateAction<IGraphic[]>>;
}

function GraphicItem({ graphic, graphicFilterList, setGraphicFilterList }: GraphicItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

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
    <div onClick={setGraphic}>
      {!isActive ? (
        <div className="none-active" style={{ color: "black" }}>
          {graphic.text}
        </div>
      ) : (
        <div className="active" style={{ color: "blue" }}>
          {graphic.text}
        </div>
      )}
    </div>
  );
}

export default GraphicItem;
