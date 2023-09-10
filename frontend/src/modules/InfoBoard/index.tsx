"use client";
import { Suspense } from "react";
import { WrapperCard } from "@/components/Card";
import RoundBoard, { RoundBoardLoading } from "./RoundBoard";
import HandlesBoard, { HandlesBoardLoading } from "./HandlesBoard";

const InfoBoard: React.FC = () => {
  return (
    <WrapperCard className="gap-y-[12px] w-full">
      <Suspense fallback={<RoundBoardLoading />}>
        <RoundBoard />
      </Suspense>
      <Suspense fallback={<HandlesBoardLoading />}>
        <HandlesBoard />
      </Suspense>
    </WrapperCard>
  );
};

export default InfoBoard;
