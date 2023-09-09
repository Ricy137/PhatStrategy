import { atomsWithQuery } from "jotai-tanstack-query";
import { BrowserProvider } from "ethers";
import { GameInfo, syncGameAtom, Game_Status } from "@/services/game";

export const Round_Status = ["end", "second hand", "first hand"] as const;

export interface CountDownInfo {
  turn: (typeof Round_Status)[number];
  lastAction: number;
  timeoutStamp: number;
  leftTime?: number;
}

export const DefaultCountDownInfo = {
  turn: "end",
  lastAction: 0,
  timeoutStamp: 0,
};

export const DefaultGameInfo = {
  started: false,
  timeoutStamp: 0,
};

export const [countDownAtom] = atomsWithQuery<CountDownInfo | null>((get) => ({
  queryKey: [
    "countdown",
    (get(syncGameAtom) as GameInfo)?.lastAction,
    (get(syncGameAtom) as GameInfo)?.status,
  ],
  // queryKey: ["countdown"],
  queryFn: async () => {
    let gameInfo = await get(syncGameAtom);
    if (typeof window === "undefined") return null;
    let gameStatusInfo = gameInfo as GameInfo | null;
    if (!window.ethereum) return null;
    if (!gameStatusInfo) return null;
    const { status, lastAction } = gameStatusInfo;
    let turn = Round_Status[Game_Status.indexOf(status)];
    const provider = new BrowserProvider(window.ethereum);
    const blockNumber = await provider.getBlockNumber();
    const blockTime = await provider.getBlock(blockNumber);
    if (!blockTime) return null;
    const timeoutStamp =
      new Date().getTime() +
      (lastAction - parseInt(blockTime.timestamp.toString()) + 5 * 60) * 1000;
    return { turn, lastAction, timeoutStamp };
  },
}));
