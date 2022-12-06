import React, { useEffect, useState } from "react";
import MainHeaderContainer from "../containers/MainHeaderContainer";
import PromotionContainer from "../containers/PromotionContainer";
import LenslistContainer from "../containers/LenslistContainer";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import { IBrands } from "../types/lens";

const BrandBestListBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 11px 9px;
  background-color: white;
`;

export default function MainPage() {
  const [period, setPeriod] = useState<string>("oneday");
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
        <MainHeaderContainer period={period} setPeriod={setPeriod} />
        <PromotionContainer period={period} />
        <BrandBestListBox>
          {brands.map((brand) => (
            <LenslistContainer key={brand.id} period={period} brand={brand} />
          ))}
        </BrandBestListBox>
      </div>
    </div>
  );
}
