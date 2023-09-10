import { atomsWithMutation } from "jotai-tanstack-query";
import { Contract, BrowserProvider } from "ethers";
import Abi from "@/utils/contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { syncGameAtom } from ".";

export const [, requestAtom] = atomsWithMutation((get) => ({
  mutationKey: ["secondhandRequest"],
  mutationFn: async (move: number) => {
    let syncGame = get(syncGameAtom);
    let stake: string;
    let solvedSyncGame = await syncGame;
    stake = solvedSyncGame?.stake || "0";
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RSPContract = new Contract(CONTRACT_ADDRESS, Abi, signer);
    let tx = await RSPContract.request(move, {
      value: BigInt((parseInt(stake) * 102) / 100),
    });
    await tx.wait();
    if (!tx.hash) throw new Error("Transaction failed");
    return tx.hash;
  },
}));
