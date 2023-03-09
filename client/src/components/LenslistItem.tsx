import React from "react";
import { Link } from "react-router-dom";
import { ILensItem } from "../types/lens";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeartItem from "./HeartItem";

const LensItemByBrandBox = styled.div`
  background-color: #f3f4f6;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  border: 2px solid #ebebeb;

  .lens-item {
    width: 95%;
    height: 68%;
    margin-top: 4px;
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
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 15px;
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
      font-size: 15px;
      width: 82%;
      heigth: 30%;
      text-align: center;
      font-weight: bold;
      padding-bottom: 5px;
      // color: #787878;
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
      <HeartItem lensId={lens.id} />
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
