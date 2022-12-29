import React, { Dispatch, SetStateAction, useState } from "react";
import { IBrands } from "../../types/lens";

interface BrandItemProps {
  brand: IBrands;
  brandFilterList: number[];
  setBrandFilterList: Dispatch<SetStateAction<number[]>>;
}

function BrandItem({ brand, brandFilterList, setBrandFilterList }: BrandItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  function setBrand() {
    const found = brandFilterList.find((b) => b === brand.id);

    if (found) {
      const brandIds = brandFilterList.filter((b) => b !== brand.id);
      setBrandFilterList(brandIds);
      setIsActive(false);
    } else {
      setBrandFilterList((prev) => [...prev, brand.id]);
      setIsActive(true);
    }
  }
  return (
    <div onClick={setBrand}>
      {!isActive ? (
        <div className="none-active" style={{ color: "black" }}>
          {brand.ko_name}
        </div>
      ) : (
        <div className="active" style={{ color: "blue" }}>
          {brand.ko_name}
        </div>
      )}
    </div>
  );
}

export default BrandItem;
