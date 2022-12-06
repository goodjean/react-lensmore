import React, { useState } from "react";
import styled from "styled-components";
import FilterItem from "../components/FilterItem";

const FilterItemStyle = styled.div`
  width: 100%;
  height: 100%;
  // background-color: yellow;
  padding: 10px;

  ul {
    width: 100%;
    height: 50%;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  h3 {
    // background-color: orange;
    width: 100%;
    height: 50%;
    padding: 28px 0;
  }
`;

interface FilterItemProps {
  title: string;
  categories: string[];
  onClick: (x: string) => void;
}

function FilterContainer({ title, categories, onClick }: FilterItemProps) {
  return (
    <FilterItemStyle>
      <h3>{title}</h3>
      <ul>
        {categories.map((category) => (
          <FilterItem key={category} category={category} onClick={onClick} />
        ))}
      </ul>
    </FilterItemStyle>
  );
}

export default FilterContainer;
