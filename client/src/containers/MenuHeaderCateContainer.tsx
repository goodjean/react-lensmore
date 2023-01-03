import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserApi from "../apis/userApi";

const MenuHeaderCategoryStyle = styled.ul`
  width: 100%;
  height: 8%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;

  li {
    width: 33.33%;
    height: 100%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 17px;
      line-height: 1.54;
      border-bottom: 2px solid #e1e1e1;
      background-color: #f6f6f6;
    }

    .menu-brand {
      border-left: 2px solid #e1e1e1;
    }

    .wishlist {
      border-left: 2px solid #e1e1e1;
    }
  }
`;

export default function MenuHeaderCateContainer() {
  const navigate = useNavigate();

  async function goMyPage() {
    const userApi = new UserApi();
    const userInfo = await userApi.goMyPage();
    if (userInfo) {
      navigate("/my-page", { state: userInfo });
    } else {
      navigate("/signin");
    }
  }

  return (
    <MenuHeaderCategoryStyle>
      <li>
        <div className="my-page" onClick={goMyPage}>
          마이페이지
        </div>
      </li>
      <li>
        <div className="wishlist" onClick={() => navigate("/wishlist")}>
          찜목록
        </div>
      </li>
      <li>
        <div className="menu-brand" onClick={() => navigate("/menu/brand")}>
          브랜드
        </div>
      </li>
    </MenuHeaderCategoryStyle>
  );
}
