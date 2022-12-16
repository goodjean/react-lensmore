import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IDays } from "../types/lens";

const MainNavBarItemBox = styled.div`
  padding: 7.7px 18px 16px 18px;
  color: #aeaeae;
  cursor: pointer;

  .on {
    color: black;
    font-weight: bold;
  }

  .on::after {
    content: "💕";
  }
`;

type MainNavBarProps = {
  day: IDays;
  state: string;
  setPeriod: Dispatch<SetStateAction<string>>;
};

export default function MainNavBar({ day, state, setPeriod }: MainNavBarProps) {
  function onClick() {
    setPeriod(day.en);
  }

  return (
    <MainNavBarItemBox>
      <div onClick={onClick} className={state}>
        {day.ko}
      </div>
    </MainNavBarItemBox>
  );
}
