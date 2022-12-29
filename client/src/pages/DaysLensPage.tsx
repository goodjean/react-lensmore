import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LensApi from "../apis/lensApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import DaysLensList from "../containers/DaysLensList";
import { ILensItem } from "../types/lens";

export default function DaysLensPage() {
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

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={period} />
        <DaysLensList lensList={lensList} />
      </div>
    </div>
  );
}
