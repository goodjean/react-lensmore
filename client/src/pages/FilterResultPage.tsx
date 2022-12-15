import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterApi from "../apis/filterApi";
import LensApi from "../apis/lensApi";
import LenslistItem from "../components/LenslistItem";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import { IBrands, IColors, IDays, IFilterLens } from "../types/lens";

function FilterResultPage() {
  const [filterLenslist, setFilterLenslist] = useState<IFilterLens[]>([]);
  const [days, setDays] = useState<IDays[]>([]); // DB
  const [colors, setColors] = useState<IColors[]>([]); //DB
  const [graphics, setGraphics] = useState<string[]>(["11.9 ~ 16.0"]);
  const [prices, setPrices] = useState<string[]>(["5000 ~ 200000원"]);
  const [brands, setBrands] = useState<IBrands[]>([]); //DB
  const { state } = useLocation();

  const period: string[] = state[0];
  const color: string[] = state[1];
  const graphic: string[] = state[2];
  const price: string[] = state[3];
  const brand: string[] = state[4];

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      setDays(await lensApi.getLensDayList());
      setBrands(await lensApi.getLensBrandList());
      setColors(await lensApi.getLensColorList());
      const filterApi = new FilterApi();
      setTimeout(async () => {
        const lensList = await filterApi.getFilteredLensList(
          period,
          color,
          graphic,
          price,
          brand
        );
        setFilterLenslist(lensList);
      }, 0);
    })();
  }, [period, color, graphic, price, brand]);

  if (period.length === 0) {
    days.forEach((day) => period.push(day.ko));
  }
  if (color.length === 0) {
    colors.forEach((cl) => color.push(cl.color));
  }
  if (graphic.length === 0) {
    graphics.forEach((gp) => graphic.push(gp));
  }
  if (price.length === 0) {
    prices.forEach((pc) => price.push(pc));
  }
  if (brand.length === 0) {
    brands.forEach((brnd) => brand.push(brnd.ko_name));
  }

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="검색결과" />
        {filterLenslist.length === 0 ? (
          <div>
            <img
              src="https://o-lens.com/assets/images/common/ico-i2.png"
              alt="no-data"
              style={{ width: 40 }}
            />
            <h3>검색결과가 없습니다.</h3>
          </div>
        ) : (
          <div>
            <h4>검색결과</h4>
            {filterLenslist.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterResultPage;