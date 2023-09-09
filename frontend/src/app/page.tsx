import Link from "next/link";
import { WrapperCard } from "@/components/Card";

export default function Home() {
  return (
    <main className="p-[24px] flex justify-center items-center min-h-screen max-w-[1920px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        <LandingBanner />
        <FirsthandCard />
        <SecondhandCard />
      </div>
    </main>
  );
}

const LandingBanner: React.FC = () => {
  return (
    <WrapperCard className="md:col-span-2 flex flex-row justify-between w-full md:w-[732px] h-fit text-[16px] md:text-[24px] leading-[24px] md:leading-[32px]">
      123
    </WrapperCard>
  );
};

const FirsthandCard: React.FC = () => {
  return (
    <Link href="/firsthand">
      <WrapperCard className="items-center justify-center text-[16px] sm:text-[24px] leading-[24px] smleading-[32px] hover:bg-[#CBF0ED]">
        First Hand
      </WrapperCard>
    </Link>
  );
};

const SecondhandCard: React.FC = () => {
  return (
    <Link href="/firsthand">
      <WrapperCard className="items-center justify-center text-[16px] sm:text-[24px] leading-[24px] smleading-[32px] hover:bg-[#CBF0ED]">
        Second Hand
      </WrapperCard>
    </Link>
  );
};
