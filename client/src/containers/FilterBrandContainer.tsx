import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import { IBrands } from "../types/lens";
import FilterBrandItem from "../components/FilterBrandItem";

const BrandContainerStyle = styled.div`
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

interface BrandContainerProps {
  setBrands: Dispatch<SetStateAction<number[]>>;
}

function FilterBrandContainer({ setBrands }: BrandContainerProps) {
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

  function clickAll() {
    if (brandFilterList.length === brandStates.length) {
      setBrandFilterList([]);
    } else {
      setBrandFilterList(brandStates.map((b) => b.id));
      setBrands(brandStates.map((b) => b.id));
    }
  }

  return (
    <BrandContainerStyle>
      <div className="title-headerbox">
        <h3>브랜드</h3>
        <span onClick={clickAll}>전체선택</span>
      </div>
      <ul>
        {brandStates.map((brand) => (
          <FilterBrandItem
            key={brand.id}
            brand={brand}
            brandFilterList={brandFilterList}
            setBrandFilterList={setBrandFilterList}
          />
        ))}
      </ul>
    </BrandContainerStyle>
  );
}

export default FilterBrandContainer;
