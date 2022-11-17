import React, { useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import { ILens } from "../types/lens";
import LenslistItem from "../components/LenslistItem";
import styled from "styled-components";

const LensListByBrandBox = styled.article`
  width: 100%;
  padding: 20px 0;

  h3 {
    padding: 14px 0px;
  }

  .brand-best-list {
    // background-color: pink;
    width: 100%;
    height: 217px;
    margin-top: 9px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }
`;

type LenslistContainerProps = {
  period: string;
  brand: string;
};

export default function LenslistContainer({ period, brand }: LenslistContainerProps) {
  const [lenslist, setLenslist] = useState<ILens[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenslistByPeriodAndBrand = await lensApi.getLenslistByPeriodAndBrand(period, brand);
      const threeLenslist = lenslistByPeriodAndBrand.slice(0, 3);
      setLenslist(threeLenslist);
    })();
  }, [period, brand]);

  return (
    <LensListByBrandBox>
      <h3>{`${brand} 베스트`}</h3>
      <div className="brand-best-list">
        {lenslist?.map((lens) => (
          <LenslistItem key={lens.id} lens={lens} />
        ))}
      </div>
    </LensListByBrandBox>
  );
}
