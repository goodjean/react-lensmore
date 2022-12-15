import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LensApi from "../apis/lensApi";
import { ILensItem } from "../types/lens";

export default function OnedayLensPage() {
  const { period } = useParams();
  const [lensList, setLensList] = useState<ILensItem[]>([]);

  if (!period) {
    throw "error";
  }

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenses = await lensApi.getLenslistByPeriod(period);
      setLensList(lenses);
    })();
  }, []);

  console.log(lensList); ///원데이 렌즈 받아와짐. 해야할거는
  //기간별 렌즈 페이지 상단에 프로모션 넣고 한달착용, 장기, 다 되는지 확인하기 그리고
  // 메뉴페이지에 잇는 나머지들도 해보기 로그인, 회원가입, 찜하기, 브랜드 ...

  return <div></div>;
}
