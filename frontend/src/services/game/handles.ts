import { atom } from "jotai";
import { BrowserProvider, Contract } from "ethers";
import Abi from "@/utils/contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { syncGameAtom } from ".";

export const handlesAtom = atom(async (get) => {
  const gameStats = await get(syncGameAtom);
  if (!gameStats) return null;
  const { status } = gameStats;
  if (status === "Null") return null;
  if (typeof window === "undefined") return;
  if (!window.ethereum) {
    throw new Error("Please install metamask");
  }
  const provider = new BrowserProvider(window.ethereum);
  const PhatStrategy = new Contract(CONTRACT_ADDRESS, Abi, provider);
  let firsthand = await PhatStrategy.handles(0);
  let secondhand = await PhatStrategy.handles(1);
  return [firsthand, secondhand];
});
