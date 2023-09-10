import { ReactNode, Suspense } from "react";
import { WrapperCard } from "@/components/Card";

const ResultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="py-[40px] flex flex-col items-center min-h-screen w-full">
      <div className="flex flex-col items-center grow gap-y-[24px] w-4/5">
        <Suspense
          fallback={
            <WrapperCard className="w-full">
              loading, it may take minutes...
            </WrapperCard>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default ResultLayout;
