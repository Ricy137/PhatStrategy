"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { syncGameAtom } from "@/services/game";

const ResultListener: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [data] = useAtom(syncGameAtom);

  useEffect(() => {
    if (!data) return;
    const { status } = data;
    if (status === "Null") {
      //delay the time to jump is because winner data is read from blockchain and it takes time to be updated
      router.push("/result");
    }
  }, [data]);

  return <>{children}</>;
};

export default ResultListener;
