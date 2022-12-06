import React from "react";
import { Link } from "react-router-dom";
import { ILensItem } from "../types/lens";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LensItemByBrandBox = styled.div`
  background-color: #f3f4f6;
  width: 32.5%;
  height: 254px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  border: 2px solid #ebebeb;

  .lens-item {
    width: 92%;
    height: 66%;
    margin-top: 6px;
  }

  .lens-item-img {
    width: 100%;
    height: 94%;
    border-radius: 14px;
    border: 1px solid lightgray;
  }

  .lens-item-info {
    width: 100%;
    height: 32%;
    padding: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1.3;
    cursor: pointer;

    .lens-name {
      width: 82%;
      height: 70%;
      padding-bottom: 3px;
      text-align: center;
      @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
      font-family: "Roboto", sans-serif;
      font-weight: bold;
    }
    .lens-graphic {
      font-size: 16px;
      width: 82%;
      heigth: 30%;
      text-align: center;
      font-weight: bold;
      // color: #787878;
      border-top: 1px solid gray;
    }
  }
`;

type LenslistItemProps = {
  lens: ILensItem;
};

export default function LenslistItem({ lens }: LenslistItemProps) {
  const navigate = useNavigate();

  function clickDesc() {
    navigate(`/product/detail/${lens.id}`);
  }

  return (
    <LensItemByBrandBox>
      <Link to={`/product/detail/${lens.id}`} className="lens-item">
        <img src={lens.img} alt="lens-item" className="lens-item-img" />
      </Link>
      <div className="lens-item-info" onClick={clickDesc}>
        <span className="lens-name">{lens.name}</span>
        <span className="lens-graphic">{lens.price}원</span>
      </div>
    </LensItemByBrandBox>
  );
}
