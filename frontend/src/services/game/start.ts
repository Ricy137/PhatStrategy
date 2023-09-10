import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { atom, useSetAtom } from "jotai";
import { BrowserProvider, parseEther, Contract } from "ethers";
import Abi from "@/utils/contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { randomBytes256, keccak256Hash } from "@/utils/cryptograph";

export const saltAtom = atom<string | null>(null);

// atom can also be used to achieve the same purpose
export const useStartGame = () => {
  const router = useRouter();
  const setSalt = useSetAtom(saltAtom);

  const startGame = useCallback(
    async (
      move: number,
      stake: number,
      firsthand: string,
      secondhand: string
    ) => {
      if (typeof window === "undefined") return;
      if (!window.ethereum) {
        throw new Error("Please install metamask");
      }
      let salt = randomBytes256();
      setSalt(salt);
      let _c1Hash = keccak256Hash(
        ["uint8", "uint256"],
        [move.toString(), salt]
      );
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const PhatStrategy = new Contract(CONTRACT_ADDRESS, Abi, signer);
      const tx = await PhatStrategy.startGame(
        _c1Hash,
        [firsthand, secondhand],
        {
          value: parseEther(stake.toString()),
        }
      );
      await tx.wait();
      router.push("/firsthand/solve");
    },
    []
  );

  return { startGame };
};
