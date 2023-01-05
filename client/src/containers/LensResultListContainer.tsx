import React from "react";
import styled from "styled-components";
import LenslistItem from "../components/LenslistItem";
import { ILensItem } from "../types/lens";

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
    padding: 20px;
  }
`;

interface LensResultListProps {
  lensList: ILensItem[];
  listCount: number;
}

function LensResultListContainer({ lensList, listCount }: LensResultListProps) {
  return (
    <>
      {lensList.length === 0 ? (
        <LensResultListStyle>
          <div className="none-results">
            <img src="https://o-lens.com/assets/images/common/ico-i2.png" alt="no-data" style={{ width: 40 }} />
            <h3>검색결과가 없습니다.</h3>
          </div>
        </LensResultListStyle>
      ) : (
        <LensResultListStyle>
          <span className="result-count">{`전체 검색 결과 (${listCount})`}</span>
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
