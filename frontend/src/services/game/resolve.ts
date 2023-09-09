import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import Abi from "@/utils/contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";

export const useResolveGame = () => {
  const router = useRouter();

  const resolveGame = useCallback(async (move: number, salt: string) => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      throw new Error("Please install metamask");
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RSPContract = new Contract(CONTRACT_ADDRESS, Abi, signer);
    let tx = await RSPContract.solve(move, salt);
    await tx.wait();
    router.push("/result");
  }, []);
  return resolveGame;
};
