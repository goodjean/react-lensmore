import React from "react";
import { ILensDetail } from "../types/lensDetail";
import styled from "styled-components";

const LensDetailDownBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 8px;

  h3 {
    margin-bottom: 30px;
  }

  .detail-desc-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .detail-imgs {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-img {
  }
`;

type LensDetailInfoDownProps = {
  lensDetail: ILensDetail;
};

export default function LensDetailInfoDown({ lensDetail }: LensDetailInfoDownProps) {
  return (
    <LensDetailDownBox>
      <h3>상세보기</h3>
      <div className="detail-desc-container">
        <div className="detail-imgs">
          <img className="detail-img" src={lensDetail.detail_img} alt="detail-sub-visual" />
        </div>
      </div>
    </LensDetailDownBox>
  );
}
