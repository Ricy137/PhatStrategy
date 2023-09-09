import { WrapperCard } from "@/components/Card";

const RoundBoard: React.FC = () => {
  return <WrapperCard className="w-full">RoundBoard</WrapperCard>;
};

export default RoundBoard;

export const RoundBoardLoading: React.FC = () => (
  <WrapperCard className="w-full">
    <div className="flex flex-col md:flex-row justify-between uppercase">
      <div className="text-[24px] leading-[32px] font-medium">turn: --</div>
      <div className="text-[16px] leading-[24px] font-medium">
        count down: --
      </div>
    </div>
  </WrapperCard>
);
