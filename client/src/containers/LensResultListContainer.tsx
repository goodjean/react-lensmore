import React from "react";
import styled from "styled-components";
import LenslistItem from "../components/LenslistItem";
import { ILensItem } from "../types/lens";

const LensResultListStyle = styled.div`
  width: 100%;
  height: 100%;
  .lenslist-container {
    padding: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`;

interface LensResultListProps {
  lensList: ILensItem[];
}

function LensResultListContainer({ lensList }: LensResultListProps) {
  return (
    <>
      {lensList.length === 0 ? (
        <LensResultListStyle>
          <img
            src="https://o-lens.com/assets/images/common/ico-i2.png"
            alt="no-data"
            style={{ width: 40 }}
          />
          <h3>검색결과가 없습니다.</h3>
        </LensResultListStyle>
      ) : (
        <LensResultListStyle>
          <span>{`전체 검색 결과 (${lensList.length})`}</span>
          <ul className="lenslist-container">
            {lensList.map((lens) => (
              <LenslistItem key={lens.id} lens={lens} />
            ))}
          </ul>
        </LensResultListStyle>
      )}
    </>
  );
}

export default LensResultListContainer;
