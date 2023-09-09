import { WrapperCard } from "@/components/Card";

const SolvingBoard: React.FC = () => {
  return (
    <WrapperCard className="flex flex-col items-center gap-y-[24px] grow w-full text-[24px] leading-[32px] font-medium">
      waiting for the first hand to resolve the result, please wait.
    </WrapperCard>
  );
};

export default SolvingBoard;
