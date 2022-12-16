import React from "react";
import { ILensDetail } from "../types/lensDetail";
import styled from "styled-components";

const LensDetailUpBox = styled.section`
  display: flex;
  width: 100%;
  height: 480px;
  padding: 24px 8px 18px;

  .detail-thumbnail-container {
    width: 60%;
    height: 100%;

    .detail-thumbnail {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .detail-desc-container {
    width: 40%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding-left: 25px;
    overflow: hidden;
    // white-space: nowrap;
  }

  .detail-main-desc {
    width: 100%;
    height: 50%;
    line-height: 1.9;
    padding-top: 16px;
    border-bottom: 1px solid lightgray;
    position: relative;
  }

  h4 {
    margin: 8px 0px 0px;
    display: flex;
    align-items: baseline;
  }

  .detail-desc-title {
    color: #6e6e6e;
    margin-right: 9px;
    font-size: 15px;
    // padding-bottom: 5px;
  }

  .detail-sub-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    line-height: 2.4;
    padding-top: 20px;
  }

  .detail-graph-period-color {
    padding-bottom: 22px;
  }

  .review-brand {
    position: absolute;
    top: 145px;
  }

  .none-color {
    display: block;
    padding-bottom: 70px;
    background: url("https://o-lens.com/assets/images/common/ico-r3.png")
      no-repeat 4% 18px;
    background-size: 67px;
  }
`;

type LensDetailInfoUpProps = {
  lensDetail: ILensDetail;
};

export default function LensDetailInfoUp({
  lensDetail,
}: LensDetailInfoUpProps) {
  return (
    <LensDetailUpBox>
      <div className="detail-thumbnail-container">
        {lensDetail.model_thumbnail ? (
          <img
            src={lensDetail.model_thumbnail}
            alt="lensdetail main visual"
            className="detail-thumbnail"
          />
        ) : (
          <img
            src={lensDetail.eye_thumbnail}
            alt="lensdetail main visual"
            className="detail-thumbnail"
          />
        )}
      </div>
      <div className="detail-desc-container">
        <div className="detail-main-desc">
          <h3>{lensDetail.name}</h3>
          <h4>
            <span className="detail-desc-title">가격:</span>
            <span>{lensDetail.price}원</span>
          </h4>
          <div className="review-brand">
            <div>
              <span className="detail-desc-title">리뷰:</span>
              <span className="detail-desc-title">
                {lensDetail.reviewcount}
              </span>
            </div>
            <div>
              <span className="detail-desc-title">브랜드:</span>
              <span className="detail-desc-title">{lensDetail.brand}</span>
            </div>
          </div>
        </div>
        <div className="detail-sub-desc">
          <div className="detail-graph-period-color">
            <div>
              <span className="detail-desc-title">직경:</span>
              <span>{lensDetail.graphic}mm</span>
            </div>
            <div>
              <span className="detail-desc-title">착용기간:</span>
              <span>{lensDetail.period}</span>
            </div>
            <div>
              <span className="detail-desc-title">색상:</span>
              <span>{lensDetail.color}</span>
            </div>
            <div>
              {!lensDetail.color_img ? (
                <span className="none-color"></span>
              ) : (
                <img
                  src={lensDetail.color_img}
                  alt="color"
                  style={{ width: 67, marginTop: 11 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LensDetailUpBox>
  );
}
