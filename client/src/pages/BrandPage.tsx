import React, { useEffect, useState } from "react";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import { IBrands } from "../types/lens";
import BrandListItem from "../components/BrandListItem";

const BrandPageStyle = styled.ul`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  list-style: none;
`;

function BrandPage() {
  const [brands, setBrands] = useState<IBrands[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const brandList = await lensApi.getLensBrandList();
      setBrands(brandList);
    })();
  }, []);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="브랜드" />
        <BrandPageStyle>
          {brands.map((brand) => (
            <BrandListItem key={brand.id} brand={brand} />
          ))}
        </BrandPageStyle>
      </div>
    </div>
  );
}

export default BrandPage;
