import { atomsWithQuery } from "jotai-tanstack-query";
import { Contract, BrowserProvider } from "ethers";
import { getGameStatus } from "@/utils/game";
import Abi from "@/utils/contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";

export const Game_Status = ["Null", "J2Moving", "J1Solving"] as const;

export interface GameInfo {
  status: (typeof Game_Status)[number];
  lastAction: number;
  stake: string;
}

export const [syncGameAtom] = atomsWithQuery<GameInfo | null>((get) => ({
  queryKey: ["gameSync"],
  queryFn: async () => {
    try {
      if (typeof window === "undefined") return null;
      if (!window.ethereum) {
        throw new Error("Please install metamask");
      }
      const provider = new BrowserProvider(window.ethereum);
      const PhatStrategy = new Contract(CONTRACT_ADDRESS, Abi, provider);
      const c2 = await PhatStrategy.c2();
      const stake = await PhatStrategy.stake();

      let lastAction = await PhatStrategy.lastAction();
      const status = getGameStatus(stake.toString(), c2.toString());
      return {
        status,
        lastAction: parseInt(lastAction.toString()),
        stake: stake,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  refetchInterval: 1000,
}));
