import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import { IColors } from "../types/lens";
import ColorItem from "./compos/ColorItem";

interface ColorContainerProps {
  setColors: Dispatch<SetStateAction<number[]>>;
}

function ColorContainer({ setColors }: ColorContainerProps) {
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

  return (
    <div>
      {colorStates.map((color) => (
        <ColorItem
          key={color.id}
          color={color}
          colorFilterList={colorFilterList}
          setColorFilterList={setColorFilterList}
        />
      ))}
    </div>
  );
}

export default ColorContainer;
