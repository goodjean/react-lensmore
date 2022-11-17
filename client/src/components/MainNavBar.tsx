import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const MainNavBarItemBox = styled.div`
  padding: 8px 18px 16px 18px;
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
  title: string;
  state: string;
  setPeriod: Dispatch<SetStateAction<string>>;
};

export default function MainNavBar({ title, state, setPeriod }: MainNavBarProps) {
  function onClick() {
    setPeriod(title);
  }

  return (
    <MainNavBarItemBox>
      <div onClick={onClick} className={state}>
        {title}
      </div>
    </MainNavBarItemBox>
  );
}
