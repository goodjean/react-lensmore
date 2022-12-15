import styled from "styled-components";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import MenuHeaderCateContainer from "../containers/MenuHeaderCateContainer";
import MenuLensCateContainer from "../containers/MenuLensCateContainer";
import MenuCommunCateContainer from "../containers/MenuCommunCateContainer";

const MenuPageStyle = styled.section`
  width: 100%;
  height: 90.3%;

  h2 {
    font-size: 21px;
    line-height: 1.5;
    color: #000;
  }
`;

export default function MenuPage() {
  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title="Menu" />
        <MenuPageStyle>
          <MenuHeaderCateContainer />
          <MenuLensCateContainer />
          <MenuCommunCateContainer />
        </MenuPageStyle>
      </div>
    </div>
  );
}
