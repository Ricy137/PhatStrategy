import Link from "next/link";
import { WrapperCard } from "@/components/Card";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] w-[90%]">
      {/* <LandingBanner /> */}
      <FirsthandCard />
      <SecondhandCard />
    </div>
  );
}

const FirsthandCard: React.FC = () => {
  return (
    <Link href="/firsthand">
      <WrapperCard className="items-center justify-center min-h-[300px] text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] hover:bg-[#CBF0ED]">
        First Hand
      </WrapperCard>
    </Link>
  );
};

const SecondhandCard: React.FC = () => {
  return (
    <Link href="/secondhand">
      <WrapperCard className="items-center justify-center min-h-[300px] text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] hover:bg-[#CBF0ED]">
        Second Hand
      </WrapperCard>
    </Link>
  );
};
