// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const FilterItemStyle = styled.li`
//   width: 30%;
//   .none-active {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     text-align: center;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     color: #aeaeae;
//     font-weight: bold;
//     margin-top: 9px;
//     cursor: pointer;
//   }

//   .active {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     text-align: center;
//     color: black;
//     font-weight: bold;
//     border: 1px solid black;
//     border-radius: 8px;
//     margin-top: 9px;
//     cursor: pointer;
//   }
// `;

// interface FilterItemProps {
//   category: string;
//   states: string[];
//   onClick: (x: string) => void;
// }

// function FilterItem({ category, states, onClick }: FilterItemProps) {
//   const [active, setActive] = useState(false); //함수 밖에다 find구문

//   useEffect(() => {
//     const found = states.find((state) => state === category);
//     if (found) {
//       setActive(true);
//     } else {
//       setActive(false);
//     }
//   }, [states, category]);

//   function clickCategory(category: string) {
//     // setActive(!active);
//     onClick(category);
//   }
//   return (
//     <FilterItemStyle onClick={() => clickCategory(category)}>
//       {!active ? <div className="none-active">{category}</div> : <div className="active">{category}</div>}
//     </FilterItemStyle>
//   );
// }

// export default FilterItem; //button api 만들기부터 시작하기
import React from "react";
