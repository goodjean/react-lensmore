import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import styled from "styled-components";
import { FiFilter, FiSearch, FiMenu } from "react-icons/fi";
import LensApi from "../apis/lensApi";
import { IDays } from "../types/lens";

const HeaderContainer = styled.header`
  width: 100%;
  height: 127px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: sticky;
  top: 0px;
  border-bottom: 1px solid lightgray;

  h1 {
    @import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
    font-family: "PT Sans", sans-serif;
    color: #505050;
    font-weight: normal;
    font-size: 33px;
  }

  .main-logo-link {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    position: relative;
    bottom: 10px;
  }

  .main-logo-link h1 {
    padding-left: 5px;
  }

  .main-features {
    display: flex;
  }

  .main-features div {
    padding: 7px;
  }

  .main-nav {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    bottom: 10px;
  }
`;

type MainHeaderContainerProps = {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
};

export default function MainHeaderContainer({
  period,
  setPeriod,
}: MainHeaderContainerProps) {
  const [days, setDays] = useState<IDays[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const dayList = await lensApi.getLensDayList();
      setDays(dayList);
    })();
  }, []);

  return (
    <HeaderContainer>
      <div className="main-logo-link">
        <Link to="/">
          <h1>LensMore</h1>
        </Link>
        <div className="main-features">
          <div>
            <Link to="/filter">
              <FiFilter size={23} color="#6e6e6e" />
            </Link>
          </div>
          <div>
            <Link to="/search">
              <FiSearch size={23} color="#6e6e6e" />
            </Link>
          </div>
          <div>
            <Link to="/menu">
              <FiMenu size={23} color="#6e6e6e" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        {days.map((day) => (
          <MainNavBar
            key={day.id}
            day={day}
            state={period === day.en ? "on" : ""}
            setPeriod={setPeriod}
          />
        ))}
      </nav>
    </HeaderContainer>
  );
}
