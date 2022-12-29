import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import BrandContainer from "./BrandContainer";
import ColorContainer from "./ColorContainer";
import GraphicContainer from "./GraphicContainer";
import PeriodContainer from "./PeriodContainer";
import PriceContainer from "./PriceContainer";

function FTPage() {
  const navigate = useNavigate();
  const [periods, setPeriods] = useState<string[]>([]);
  const [colors, setColors] = useState<number[]>([]);
  const [graphics, setGraphics] = useState<{ min: number; max: number; isPositive: boolean }[]>([]); // type
  const [prices, setPrices] = useState<{ min: number; max: number; isPositive: boolean }[]>([]); // type
  const [brands, setBrands] = useState<number[]>([]);

  function filter() {
    navigate("/filter-test/result", {
      state: [periods, colors, graphics, prices, brands],
    });
  }

  //   console.log("[periods]: ", periods);
  //   console.log("[colors]: ", colors);
  //   console.log("[brands]: ", brands);
  //   console.log("[graphics]: ", graphics);
  //   console.log("[prices]: ", prices);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="Filter" />
        <PeriodContainer setPeriods={setPeriods} />
        <ColorContainer setColors={setColors} />
        <GraphicContainer setGraphics={setGraphics} />
        <PriceContainer setPrices={setPrices} />
        <BrandContainer setBrands={setBrands} />
        <button onClick={filter}>검색</button>
      </div>
    </div>
  );
}

export default FTPage;
