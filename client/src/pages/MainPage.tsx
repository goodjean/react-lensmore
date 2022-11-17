import React, { useState } from "react";
import MainHeaderContainer from "../containers/MainHeaderContainer";
import PromotionContainer from "../containers/PromotionContainer";
import LenslistContainer from "../containers/LenslistContainer";
import styled from "styled-components";

const BrandBestListBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 11px 9px;
`;

export default function MainPage() {
  const [period, setPeriod] = useState("원데이");

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <MainHeaderContainer period={period} setPeriod={setPeriod} />
        <PromotionContainer period={period} />
        <BrandBestListBox>
          <LenslistContainer period={period} brand="오렌즈" />
          <LenslistContainer period={period} brand="렌즈미" />
          <LenslistContainer period={period} brand="렌즈타운" />
        </BrandBestListBox>
      </div>
    </div>
  );
}
