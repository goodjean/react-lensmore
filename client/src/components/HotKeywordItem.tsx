import React from "react";
import { useNavigate } from "react-router-dom";
import { IHotKeyword } from "../types/lens";
import styled from "styled-components";

const HotKeywordItemStyle = styled.li`
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid #f6f6f6;
  line-height: 1.47;
  font-size: 19px;
  // display: flex;
  // justify-content: center;
  // gap: 11px;
  font-weight: 500;
  cursor: pointer;

  .hot-bx {
    width: 100%;
    padding: 0 20px;
    display: flex;
    gap: 40px;
  }

  .hot-index {
    color: #fb7eb4;
    font-weight: 700;
  }
`;

interface HotKeywordItemProps {
  hotKeyword: IHotKeyword;
  index: number;
}

function HotKeywordItem({ hotKeyword, index }: HotKeywordItemProps) {
  const navigate = useNavigate();

  return (
    <HotKeywordItemStyle
      onClick={() => {
        navigate(`/product/detail/${hotKeyword.id}`);
      }}
    >
      <div className="hot-bx">
        <span className="hot-index">{index + 1}</span>
        <span>{hotKeyword.name}</span>
      </div>
    </HotKeywordItemStyle>
  );
}

export default HotKeywordItem;
