import styled from "styled-components";

const MenuHeaderCategoryStyle = styled.ul`
  width: 100%;
  height: 11%;
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
      font-size: 18px;
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
  return (
    <MenuHeaderCategoryStyle>
      <li>
        <div className="my-page">마이페이지</div>
      </li>
      <li>
        <div className="wishlist">찜목록</div>
      </li>
      <li>
        <div className="menu-brand">브랜드</div>
      </li>
    </MenuHeaderCategoryStyle>
  );
}
