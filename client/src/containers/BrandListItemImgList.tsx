import React from "react";
import { IBrands } from "../types/lens";
import styled from "styled-components";

const BrandListItemImgListStyle = styled.ul`
  width: 100%;
  height: 60%;
  display: flex;
  list-style: none;

  li {
    width: 30%;
    height: 100%;
  }

  .sub-img {
    width: 100%;
    height: 100%;
    padding: 4px;
    border-radius: 12px;
  }
`;

interface BrandListItemImgListProps {
  brand: IBrands;
}

function BrandListItemImgList({ brand }: BrandListItemImgListProps) {
  return (
    <BrandListItemImgListStyle>
      <li>
        <img className="sub-img" src={brand.sub_img1} alt="sub-img1" />
      </li>
      <li>
        <img className="sub-img" src={brand.sub_img2} alt="sub-img2" />
      </li>
      <li>
        <img className="sub-img" src={brand.sub_img3} alt="sub-img3" />
      </li>
    </BrandListItemImgListStyle>
  );
}

export default BrandListItemImgList;
