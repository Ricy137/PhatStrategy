"use client";
import { ReactNode } from "react";
import ResultListener from "@/modules/ResultListener";

const SecondHandLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ResultListener>
      <div className="pb-[40px] flex flex-col items-center min-h-screen w-full">
        <div className="flex flex-col items-center gap-y-[24px] grow w-[90%] max-w-[1920px]">
          {children}
        </div>
      </div>
    </ResultListener>
  );
};

export default SecondHandLayout;
