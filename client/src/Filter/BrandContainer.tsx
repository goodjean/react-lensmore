import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import { IBrands } from "../types/lens";
import BrandItem from "./compos/BrandItem";

interface BrandContainerProps {
  setBrands: Dispatch<SetStateAction<number[]>>;
}

function BrandContainer({ setBrands }: BrandContainerProps) {
  const [brandStates, setBrandStates] = useState<IBrands[]>([]);
  const [brandFilterList, setBrandFilterList] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const brandList = await lensApi.getLensBrandList();
      setBrandStates(brandList);
    })();
  }, []);

  useEffect(() => {
    if (brandFilterList.length === 0) {
      setBrands(brandStates.map((brand) => brand.id));
    } else {
      setBrands(brandFilterList);
    }
  }, [setBrands, brandFilterList, brandStates]);

  return (
    <div>
      {brandStates.map((brand) => (
        <BrandItem
          key={brand.id}
          brand={brand}
          brandFilterList={brandFilterList}
          setBrandFilterList={setBrandFilterList}
        />
      ))}
    </div>
  );
}

export default BrandContainer;
