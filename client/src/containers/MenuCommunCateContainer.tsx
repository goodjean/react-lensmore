import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuCommunCategoryStyle = styled.div`
  width: 100%;
  height: 25%;
  padding: 10px 32px 0;

  .intro-service {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    list-style: none;

    li {
      width: 30%;
      height: 100%;
    }

    a {
      display: block;
      text-align: center;
      padding: 12px;
      border: 2px solid #e1e1e1;
      border-radius: 12px;
      font-size: 18px;
      line-height: 1.54;
    }
  }
`;

export default function MenuCommunCateContainer() {
  return (
    <MenuCommunCategoryStyle>
      <h2>커뮤니티</h2>
      <ul className="intro-service">
        <li>
          <Link to={"/community/homepage"}>홈페이지 소개</Link>
        </li>
        <li>
          <Link to={"/community/notice"}>공지사항</Link>
        </li>
        <li>
          <Link to={"/community/faq"}>FAQ</Link>
        </li>
      </ul>
    </MenuCommunCategoryStyle>
  );
}
