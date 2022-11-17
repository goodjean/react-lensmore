import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const NavBarBackHome = styled.header`
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0px;
  background-color: white;

  nav {
    cursor: pointer;
  }
`;

type NavBarToBackAndHomeProps = {
  title: string;
};

export default function NavBarToBackAndHome({ title }: NavBarToBackAndHomeProps) {
  const navigate = useNavigate();

  return (
    <NavBarBackHome>
      <nav
        onClick={() => {
          navigate(-1);
        }}
      >
        {<IoIosArrowBack size={29} />}
      </nav>
      <h2>{title}</h2>
      <nav
        onClick={() => {
          navigate("/");
        }}
      >
        <IoHomeOutline size={29} />
      </nav>
    </NavBarBackHome>
  );
}
