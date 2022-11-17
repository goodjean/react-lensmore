import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ColorBarItemBox = styled.div`
  background-color: ${(props) => props.color};
  width: 30%;
  border-radius: 10px;

  .color-bar {
    visibility: hidden;
  }
`;

type LensColorBarItemProps = {
  id: number;
  color: string;
};

export default function LensColorBarItem({ id, color }: LensColorBarItemProps) {
  const navigate = useNavigate();

  function click() {
    navigate(`/product/detail/${id}`);
  }

  return (
    <ColorBarItemBox onClick={click} color={color}>
      <span className="color-bar">{color}</span>
    </ColorBarItemBox>
  );
}
