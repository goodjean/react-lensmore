import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import AllSelectBox from "../components/AllSelectBox";
import FilterItem from "../components/FilterItem";

const FilterItemStyle = styled.div`
  width: 100%;
  height: 100%;
  // background-color: yellow;
  padding: 10px;

  ul {
    // background-color: red;
    width: 100%;
    height: 50%;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  h3 {
    width: 100%;
    height: 50%;
    padding: 28px 0;
  }

  .title-headerbox {
    width: 100%;
    height: 52%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    h3 {
      width: 80%;
    }
  }
`;

interface FilterItemProps {
  title: string;
  categories: string[];
  states: string[];
  onClick: (x: string) => void;
  setStates: Dispatch<SetStateAction<string[]>>;
}

function FilterContainer({
  title,
  categories,
  states,
  onClick,
  setStates,
}: FilterItemProps) {
  return (
    <FilterItemStyle>
      {title === "직경" || title === "가격" ? (
        <h3>{title}</h3>
      ) : (
        <div className="title-headerbox">
          <h3>{title}</h3>
          <AllSelectBox
            categories={categories}
            states={states}
            setStates={setStates}
          />
        </div>
      )}
      <ul>
        {categories.map((category) => (
          <FilterItem
            key={category}
            category={category}
            states={states}
            onClick={onClick}
          />
        ))}
      </ul>
    </FilterItemStyle>
  );
}

export default FilterContainer;
