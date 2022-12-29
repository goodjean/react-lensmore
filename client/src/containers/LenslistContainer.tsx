import React, { useEffect, useState } from "react";
import LensApi from "../apis/lensApi";
import { IBrands, ILensItem } from "../types/lens";
import LenslistItem from "../components/LenslistItem";
import styled from "styled-components";

const LensListByBrandBox = styled.article`
  width: 100%;
  padding: 30px 0;

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
    gap: 20px;
  }
`;

type LenslistContainerProps = {
  period: string;
  brand: IBrands;
};

export default function LenslistContainer({
  period,
  brand,
}: LenslistContainerProps) {
  const [lenslist, setLenslist] = useState<ILensItem[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenslistByPeriodAndBrand =
        await lensApi.getLenslistByPeriodAndBrand(period, brand.id);
      setLenslist(lenslistByPeriodAndBrand);
    })();
  }, [period, brand.id]);

  return (
    <LensListByBrandBox>
      <h3>{`${brand.ko_name} 베스트`}</h3>
      <div className="brand-best-list">
        {lenslist?.map((lens) => (
          <LenslistItem key={lens.id} lens={lens} />
        ))}
      </div>
    </LensListByBrandBox>
  );
}
