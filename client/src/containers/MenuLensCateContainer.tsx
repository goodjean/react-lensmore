import { useEffect, useState } from "react";
import styled from "styled-components";
import LensApi from "../apis/lensApi";
import MenuLensCateItem from "../components/MenuLensCateItem";
import { IDays } from "../types/lens";

const MenuLensCategoryStyle = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 60px 32px 0;

  .lens-by-period {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin-top: 14px;
  }
  li {
    width: 30%;
    height: 70%;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    cursor: pointer;
  }

  li.oneday {
    background: url("https://o-lens.com/assets/images/common/ico-r1.png")
      no-repeat 50% 25%;
  }

  li.weekly-1month {
    background: url("https://o-lens.com/assets/images/common/ico-r2.png")
      no-repeat 50% 25%;
  }

  li.long-term {
    background: url("https://o-lens.com/assets/images/common/ico-r4.png")
      no-repeat 50% 25%;
  }

  a {
    width: 100%;
    height: auto;
    padding: 30px 0;
    text-align: center;
    font-size: 18px;
    line-height: 1.54;
    font-weight: bold;
    padding-bottom: 8%;
  }
`;

export default function MenuLensCateContainer() {
  const [days, setDays] = useState<IDays[]>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const dayList = await lensApi.getLensDayList();
      setDays(dayList);
    })();
  }, []);

  return (
    <MenuLensCategoryStyle>
      <h3>렌즈구분</h3>
      <ul className="lens-by-period">
        {days.map((day) => (
          <MenuLensCateItem key={day.id} day={day} />
        ))}
      </ul>
    </MenuLensCategoryStyle>
  );
}
