import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LensApi from "../apis/lensApi";
import NavBarToBackAndHome from "../components/NavBarToBackAndHome";
import DaysLensList from "../containers/DaysLensList";
import { ILensItem } from "../types/lens";

export default function DaysLensPage() {
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const [listCount, setListCount] = useState<number>(0);
  const [blockNum, setBlockNum] = useState(0);
  const { period } = useParams();
  const [lensList, setLensList] = useState<ILensItem[]>([]);

  if (!period) {
    throw "error";
  }

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenses = await lensApi.getLenslistByPeriodByOffset(period, page, limit);
      setLensList(lenses);
    })();
  }, [period, page, limit]);

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lenses = await lensApi.getLenslistByPeriod(period);
      setListCount(lenses.length);
    })();
  }, [period]);

  return (
    <div className="wrap">
      <div className="wrap-inner">
        <NavBarToBackAndHome title={period} />
        <DaysLensList
          lensList={lensList}
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          listCount={listCount}
        />
      </div>
    </div>
  );
}
