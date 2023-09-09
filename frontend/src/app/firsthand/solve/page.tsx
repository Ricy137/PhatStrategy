"use client";
import { PropsWithChildren } from "react";
import { useAtomValue } from "jotai";
import ToolTip from "@/components/Tooltip";
import { QuestionIcon } from "@/components/Icons";
import { WrapperCard } from "@/components/Card";
import { syncGameAtom, saltAtom } from "@/services/game";
import FirstHandSolveFrom from "./FirstHandSolveForm";

const FirsthandSolveBoard: React.FC = () => {
  return (
    <FirstHandWaiting>
      <FirstHandSolveFrom />
    </FirstHandWaiting>
  );
};

export default FirsthandSolveBoard;

const FirstHandWaiting: React.FC<PropsWithChildren> = ({ children }) => {
  const salt = useAtomValue(saltAtom);
  const data = useAtomValue(syncGameAtom);

  if (data?.status === "J2Moving")
    return (
      <WrapperCard className="flex flex-col gap-y-[24px] grow w-full">
        <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium uppercase">
          Waiting for the second hand to play
        </div>
        <div className="text-[12px] sm:text-[14px] leading-[22px] sm:leading-[20px]">
          You need save the salt and send the game address to the second hand to
          join <br />
          After second hand moved, the page will redirect automatically
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px]">
          <span className="flex flex-row items-center whitespace-nowrap">
            Salt &#40; don&#39;t leak!&#41;
            <ToolTip text="Secrete variable only existed locally.Please don't leak and first hand need to save it to resolve the result.">
              <QuestionIcon />
            </ToolTip>
            {": "}
          </span>
          <span className="break-all">{salt ?? "--"}</span>
        </div>
      </WrapperCard>
    );

  return <>{children}</>;
};
