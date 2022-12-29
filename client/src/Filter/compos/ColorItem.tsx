import React, { Dispatch, SetStateAction, useState } from "react";
import { IColors } from "../../types/lens";

interface ColorItemProps {
  color: IColors;
  colorFilterList: number[];
  setColorFilterList: Dispatch<SetStateAction<number[]>>;
}

function ColorItem({ color, colorFilterList, setColorFilterList }: ColorItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  function setColor() {
    const found = colorFilterList.find((c) => c === color.id);

    if (found) {
      const colorIds = colorFilterList.filter((c) => c !== color.id);
      setColorFilterList(colorIds);
      setIsActive(false);
    } else {
      setColorFilterList((prev) => [...prev, color.id]);
      setIsActive(true);
    }
  }

  return (
    <div onClick={setColor}>
      {!isActive ? (
        <div className="none-active" style={{ color: "black" }}>
          {color.color}
        </div>
      ) : (
        <div className="active" style={{ color: "blue" }}>
          {color.color}
        </div>
      )}
    </div>
  );
}

export default ColorItem;
