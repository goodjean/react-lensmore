import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AllSelectBoxProps {
  categories: string[];
  states: string[];
  setStates: Dispatch<SetStateAction<string[]>>;
}

export default function AllSelectBox({
  categories,
  states,
  setStates,
}: AllSelectBoxProps) {
  function clickAll() {
    if (states.length === categories.length) {
      setStates([]);
    } else {
      setStates(categories);
    }
  }

  return <span onClick={clickAll}>전체선택</span>;
}
