import { Dispatch, SetStateAction } from "react";
import { ILensItem } from "../types/lens";
import LensResultListContainer from "./LensResultListContainer";
import PaginationList from "./PaginationList";

interface DaysLensListProps {
  lensList: ILensItem[];
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  blockNum: number;
  setBlockNum: Dispatch<SetStateAction<number>>;
  listCount: number;
}

function DaysLensList({ lensList, limit, page, setPage, blockNum, setBlockNum, listCount }: DaysLensListProps) {
  return (
    <>
      <LensResultListContainer lensList={lensList} listCount={listCount} />
      <PaginationList
        limit={limit}
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        listCount={listCount}
      />
    </>
  );
}

export default DaysLensList;
