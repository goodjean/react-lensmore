import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LensDetailApi from "../apis/lensDetailApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import LensDetailInfoUp from "../components/LensDetailInfoUp";
import LensDetailInfoDown from "../components/LensDetailInfoDown";
import { ILensDetail } from "../types/lensDetail";
import styled from "styled-components";

const EmptyBox = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export default function LensDetailPage() {
  const { id } = useParams();
  const [lensDetail, setLensDetail] = useState<ILensDetail | undefined>();
  const title = "상세정보";

  if (!id) {
    // eslint-disable-next-line no-throw-literal
    throw "error";
  }

  useEffect(() => {
    (async () => {
      const lensDetailApi = new LensDetailApi();
      const lensDetail = await lensDetailApi.getLensDetailById(id);
      setLensDetail(lensDetail);
    })();
  }, [id]);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        {!lensDetail ? (
          <>
            <NavBarToBackAndHome title={title} />
            <EmptyBox>해당하는 렌즈정보가 없습니다</EmptyBox>
          </>
        ) : (
          <>
            <NavBarToBackAndHome title={title} />
            <LensDetailInfoUp lensDetail={lensDetail} />
            <LensDetailInfoDown lensDetail={lensDetail} />
          </>
        )}
      </div>
    </div>
  );
}
