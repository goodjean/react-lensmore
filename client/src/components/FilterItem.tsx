import React, { useState } from "react";
import styled from "styled-components";

const FilterItemStyle = styled.li`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 1px solid gray;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;

  .active {
    height: 100%;
    background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    border: 0px solid black;
    border-radius: 7px;
    cursor: pointer;
  }
`;

interface FilterItemProps {
  category: string;
  onClick: (x: string) => void;
}

function FilterItem({ category, onClick }: FilterItemProps) {
  const [active, setActive] = useState(false);
  function clickCategory(category: string) {
    setActive(!active);
    onClick(category);
  }
  return (
    <FilterItemStyle onClick={() => clickCategory(category)}>
      {!active ? (
        <div>{category}</div>
      ) : (
        <div className="active">{category}</div>
      )}
    </FilterItemStyle>
  );
}

export default FilterItem; //button api 만들기부터 시작하기
