import React from "react";
import { BsInbox } from "react-icons/bs";
import LenslistItem from "../components/LenslistItem";
import { ILensItem } from "../types/lens";
import styled from "styled-components";

const LensResultListStyle = styled.div`
  width: 100%;
  padding-top: 35px;

  .lenslist-container {
    padding: 20px 20px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .none-results {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150px 0;
    gap: 18px;
  }

  .result-count {
    color: #646464;
    padding-left: 20px;
  }

  .about-all-bx {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }

  .all-delete {
    color: #646464;
    padding-right: 20px;
  }
`;

interface WishListContainerProps {
  lenslist: ILensItem[];
}

function WishListContainer({ lenslist }: WishListContainerProps) {
  function deleteAllWishlist() {
    //서버에서 sessionkey 조회해서 이ㄹ
  }

  return (
    <>
      {lenslist.length === 0 ? (
        <LensResultListStyle>
          <div className="none-results">
            <BsInbox style={{ fontSize: 60 }} />
            <h3>찜한 상품이 없습니다</h3>
          </div>
        </LensResultListStyle>
      ) : (
        <LensResultListStyle>
          <div className="about-all-bx">
            <span className="result-count">{`전체 검색 결과 (${lenslist.length})`}</span>
            <span className="all-delete" onClick={deleteAllWishlist}>
              전체삭제
            </span>
          </div>
          <ul className="lenslist-container">
            {lenslist.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} />
            ))}
          </ul>
        </LensResultListStyle>
      )}
    </>
  );
}

export default WishListContainer;
