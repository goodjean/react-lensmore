import { ILensItem } from "../types/lens";
import LensResultListContainer from "./LensResultListContainer";

interface DaysLensListProps {
  lensList: ILensItem[];
}

function DaysLensList({ lensList }: DaysLensListProps) {
  return (
    <>
      <LensResultListContainer lensList={lensList} />
    </>
  );
}

export default DaysLensList;
