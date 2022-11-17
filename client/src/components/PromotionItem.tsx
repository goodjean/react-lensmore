import React from "react";
import { IPromotion } from "../types/promotion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PromotionItemBox = styled.div`
  padding: 18px 9px;
  // width: 494px; (before px)
  width: 100%;
  height: 620px;

  .promotion-img-box {
    width: 100%;
    height: 100%;
  }

  .promotion-img {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }

  .loading-img {
    width: 100%;
    heigth: 100%;
    border-radius: 13px;
  }
`;

type PromotionItemProps = {
  promotion: IPromotion | undefined;
};

function PromotionItem({ promotion }: PromotionItemProps) {
  const navigate = useNavigate();

  function clickImg() {
    navigate(`/product/detail/${promotion?.id}`);
  }

  return (
    <PromotionItemBox>
      <div className="promotion-img-box" onClick={clickImg}>
        {!promotion ? (
          <img
            className="loading-img"
            src="https://previews.123rf.com/images/estherpoon/estherpoon1706/estherpoon170600035/80108153-%EB%A1%9C%EB%94%A9-%EC%95%84%EC%9D%B4%EC%BD%98.jpg"
            alt="loading..."
          />
        ) : (
          <img src={promotion.model_thumbnail} alt="promotion item" className="promotion-img" />
        )}
      </div>
    </PromotionItemBox>
  );
}

export default PromotionItem;
