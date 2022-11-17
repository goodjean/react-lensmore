import React from "react";
import { useNavigate } from "react-router-dom";
import { IHotKeyword } from "../types/lens";

interface HotKeywordItemProps {
  hotKeyword: IHotKeyword;
  index: number;
}

function HotKeywordItem({ hotKeyword, index }: HotKeywordItemProps) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/product/detail/${hotKeyword.id}`);
      }}
    >
      <span>{index + 1}</span>
      <span>{hotKeyword.name}</span>
    </li>
  );
}

export default HotKeywordItem;
