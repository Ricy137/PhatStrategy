import { useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import Abi from "@/utils/contract/abi.json";
import { CHAIN_ID, CONTRACT_ADDRESS } from "@/utils/constants";
// import { useShowToast } from "@/components/Toast";

//TODO: derived atom is a better way than hook
// export const timeoutAtom = atom(async (get) => {
//   const gameEssential = get(gameEssentialAtom);
//   const countDownInfo = await get(countDownAtom);
//   debugger;
//   if (!countDownInfo || !gameEssential?.contractAdd) return null;
//   const { timeoutStamp } = countDownInfo;
//   console.log("timeoutStamp", timeoutStamp);
//   debugger;
//   const leftTime = Math.floor((timeoutStamp - new Date().getTime()) / 1000);
//   console.log("leftTime", leftTime);
//   if (leftTime <= 0) return countDownInfo.turn;
// });

export const useTimeout = () => {
  const router = useRouter();
  //   const showToast = useShowToast();

  const j1Timeout = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      //   showToast({ content: "Please install metamask", type: "failed" });
      return;
    }
    let network = window.ethereum.networkVersion;
    if (network !== CHAIN_ID) {
      //   showToast({
      //     content: "Please change your network to Sepolia",
      //     type: "failed",
      //   });
      return null;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const PhatStrategy = new Contract(CONTRACT_ADDRESS, Abi, signer);
    const tx = await PhatStrategy.j1Timeout();
    await tx.wait();
    // showToast({
    //   content: "Stake has be returned sucessfully",
    //   type: "success",
    // });
    router.push("/");
  }, []);

  const j2Timeout = useCallback(async () => {
    //to avoid error during server pre-rendering
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      //   showToast({ content: "Please install metamask", type: "failed" });
      return;
    }
    let network = window.ethereum.networkVersion;
    if (network !== CHAIN_ID) {
      //   showToast({
      //     content: "Please change your network to Sepolia",
      //     type: "failed",
      //   });
      return null;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RPSContract = new Contract(CONTRACT_ADDRESS, Abi, signer);
    const tx = await RPSContract.j2Timeout();
    await tx.wait();
    // showToast({
    //   content: "Stake has be returned sucessfully",
    //   type: "success",
    // });
    router.push("/");
  }, []);

  return { j1Timeout, j2Timeout };
};

export * from "./countDown";
