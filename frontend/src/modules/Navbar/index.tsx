"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Dope from "@/assets/dope.svg";

const Navbar: React.FC = () => {
  const pathName = usePathname();
  return (
    <div className="fixed p-[24px] w-full h-[80px]">
      {pathName !== "/" && (
        <Link href="/">
          <Image src={Dope} alt="nav" className="w-[24px] h-[24px]" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
