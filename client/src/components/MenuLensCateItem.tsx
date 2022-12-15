import { Link, useNavigate } from "react-router-dom";
import { IDays } from "../types/lens";
import styled from "styled-components";

const MenuLensCateItemStyle = styled.li``;

interface MenuLensCateItemProps {
  day: IDays;
}

export default function MenuLensCateItem({ day }: MenuLensCateItemProps) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/menu/lens-list/${day.en}`);
  }

  return (
    <li className={day.en} onClick={onClick}>
      <Link to={`/menu/lens-list/${day.en}`}>{day.ko}</Link>
    </li>
  );
}
