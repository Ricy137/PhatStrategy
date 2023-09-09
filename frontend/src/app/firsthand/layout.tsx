import { ReactNode, Suspense } from "react";
import RoundBoard, { RoundBoardLoading } from "@/modules/RoundBoard";

const FirstHandLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="py-[40px] flex flex-col items-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-y-[24px] grow w-[90%] max-w-[1920px]">
        <Suspense fallback={<RoundBoardLoading />}>
          <RoundBoard />
        </Suspense>
        {children}
      </div>
    </div>
  );
};

export default FirstHandLayout;
