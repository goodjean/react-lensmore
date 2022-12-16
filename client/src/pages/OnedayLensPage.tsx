import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LensApi from "../apis/lensApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import SwiperContainer from "../containers/SwiperContainer";
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
  }, [period]);

  console.log(lensList);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={period} />
        <SwiperContainer />
      </div>
    </div>
  );
}
