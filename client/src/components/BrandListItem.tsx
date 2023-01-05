import React from "react";
import { IBrands } from "../types/lens";
import styled from "styled-components";
import BrandListItemImgList from "../containers/BrandListItemImgList";

const BrandListItemStyle = styled.li`
  width: 100%;
  height: 30%;
  display: flex;
  padding: 10px 6px;
  border-bottom: 2px solid #e1e1e1;

  .thumbnail-bx {
    width: 30%;

    .thumb-img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
  }

  .brand-info-bx {
    width: 65%;
    heigth: 100%;
    padding: 3px 0 15px 50px;
    display: flex;
    flex-direction: column;

    .info-up {
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .page-url {
        font-weight: 330;
        cursor: pointer;
      }
    }
  }
`;

interface BrandListItemProps {
  brand: IBrands;
}

function BrandListItem({ brand }: BrandListItemProps) {
  return (
    <BrandListItemStyle>
      <div className="thumbnail-bx">
        <img className="thumb-img" src={brand.thumbnail} alt="thumbnail" />
      </div>
      <div className="brand-info-bx">
        <div className="info-up">
          <h3 className="brand-name">
            <a href={brand.url} target="_blank" rel="noreferrer">
              {brand.ko_name}
            </a>
          </h3>
          <a href={brand.url} target="_blank" rel="noreferrer" className="page-url">
            홈페이지 방문하기
          </a>
        </div>
        <BrandListItemImgList brand={brand} />
      </div>
    </BrandListItemStyle>
  );
}

export default BrandListItem;
