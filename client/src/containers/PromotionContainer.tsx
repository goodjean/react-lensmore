import React, { useEffect, useState } from "react";
import { IPromotion } from "../types/promotion";
import PromotionApi from "../apis/promotionApi";
import PromotionItem from "../components/PromotionItem";

type PromotionContainerProps = {
  period: string;
};

export default function PromotionContainer({
  period,
}: PromotionContainerProps) {
  const [promotion, setPromotion] = useState<undefined | IPromotion>();

  useEffect(() => {
    (async () => {
      const promotionApi = new PromotionApi();
      const PromotionProduct = await promotionApi.getPromotionProductByPeriod(
        period
      );
      setPromotion(PromotionProduct);
    })();
  }, [period]);
  return <PromotionItem promotion={promotion} />;
}
