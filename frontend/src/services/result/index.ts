import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { decodeData } from "@/utils/cryptograph";
import { syncGameAtom, GameInfo } from "../game";

const Result_dic = ["TIE", "Firsthand won!", "Secondhand won!"];

export const [resultAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: ["result", (get(syncGameAtom) as GameInfo)?.status],
  queryFn: async () => {
    const res = await fetch(
      `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=39953427&toBlock=999999999999&address=${CONTRACT_ADDRESS}&topic0=0x34fa627446f032cedc60a5521c4a8fbdd28f3ce106d8c6f6c17322ada873cebb&sort=desc`
    );
    const data = await res.json();
    const { result } = data;
    if (!result || result.length <= 0 || !(result instanceof Array))
      throw new Error("No result");
    let length = result.length;
    let decodedData = decodeData(
      ["uint256", "uint256"],
      result[length - 1].data
    );
    let resNum = parseInt(decodedData[1]);
    let resStr = Result_dic[resNum];
    return resStr;
  },
  getNextPageParam: () => {
    return true;
  },
  retryDelay: 1000,
  retry: 10,
}));
