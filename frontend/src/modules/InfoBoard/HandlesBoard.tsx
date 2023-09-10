"use client";
import { useAtomValue } from "jotai";
import { handlesAtom } from "@/services/game/handles";

const HandlesBoard: React.FC = () => {
  const handles = useAtomValue(handlesAtom);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center ">
      <div className="flex flex-row items-center gap-x-[8px]">
        <span className="font-medium">Firsthand handle:</span>
        <span>{handles?.[0]}</span>
      </div>
      <div className="flex flex-row items-center gap-x-[8px]">
        <span className="font-medium">Secondhand handle:</span>
        <span>{handles?.[1]}</span>
      </div>
    </div>
  );
};

export default HandlesBoard;

export const HandlesBoardLoading: React.FC = () => (
  <div className="flex flex-col md:flex-row justify-between items-center ">
    <div className="flex flex-row items-center gap-x-[8px]">
      <span className="font-medium">Firsthand handle:</span>
      <span>--</span>
    </div>
    <div className="flex flex-row items-center gap-x-[8px]">
      <span className="font-medium">Secondhand handle:</span>
      <span>--</span>
    </div>
  </div>
);
