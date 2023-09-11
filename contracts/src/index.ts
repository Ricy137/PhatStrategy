import "@phala/pink-env";
import { Coders } from "@phala/ethers";

type HexString = `0x${string}`;

// eth abi coder
const uintCoder = new Coders.NumberCoder(32, false, "uint256");
const stringCoder = new Coders.StringCoder("string");

function encodeReply(reply: [number, number, number]): HexString {
  return Coders.encode([uintCoder, uintCoder, uintCoder], reply) as HexString;
}

// Defined in TestLensOracle.sol
const TYPE_RESPONSE = 0;
const TYPE_ERROR = 2;

enum Error {
  BadLensProfileId = "BadLensProfileId",
  FailedToFetchData = "FailedToFetchData",
  FailedToDecode = "FailedToDecode",
  MalformedRequest = "MalformedRequest",
}

function errorToCode(error: Error): number {
  switch (error) {
    case Error.BadLensProfileId:
      return 1;
    case Error.FailedToFetchData:
      return 2;
    case Error.FailedToDecode:
      return 3;
    case Error.MalformedRequest:
      return 4;
    default:
      return 0;
  }
}

function fetchLensApiStats(lensApi: string, handle: string[]): any {
  if (handle[0] == handle[1]) return 0;
  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
  const rankStra = Math.random() > 0.5 ? "engagement" : "creator";
  const firstUrl = `${lensApi}/profile/score?strategy=${rankStra}&handle=${handle[0]}`;
  const secondUrl = `${lensApi}/profile/score?strategy=${rankStra}&handle=${handle[1]}`;
  try {
    let [res1, res2] = pink.batchHttpRequest(
      [
        {
          url: firstUrl,
          method: "GET",
          headers,
          returnTextBody: true,
        },
        {
          url: secondUrl,
          method: "GET",
          headers,
          returnTextBody: true,
        },
      ],
      10000
    );
    // if (res1.statusCode !== 200||res2.statusCode !== 200) {
    //   console.log(
    //     `Fail to read Lens api with status code: ${response.statusCode}, error: ${
    //       response.error || response.body
    //     }}`
    //   );
    //   throw Error.FailedToFetchData;
    // }
    // let respBody = response.body;
    if (typeof res1.body !== "string" || typeof res2.body !== "string") {
      throw Error.FailedToDecode;
    }
    let res1Body = JSON.parse(res1.body);
    let res2Body = JSON.parse(res2.body);
    let res = res1Body.score > res2Body.score ? 1 : 2;
    return res;
  } catch (e) {
    console.log(e);
    throw Error.FailedToFetchData;
  }
}

//
// Here is what you need to implemented for Phat Function, you can customize your logic with
// JavaScript here.
//
// The function will be called with two parameters:
//
// - request: The raw payload from the contract call `request` (check the `request` function in TestLensApiConsumerConract.sol).
//            In this example, it's a tuple of two elements: [requestId, profileId]
// - settings: The custom settings you set with the `config_core` function of the Action Offchain Rollup Phat Contract. In
//            this example, it just a simple text of the lens api url prefix.
//
// Your returns value MUST be a hex string, and it will send to your contract directly. Check the `_onMessageReceived` function in
// TestLensApiConsumerContract.sol for more details. We suggest a tuple of three elements: [successOrNotFlag, requestId, data] as
// the return value.
//
export default function main(request: HexString, settings: string): HexString {
  console.log(`handle req: ${request}`);
  let requestId, firstHand, secondHand;
  try {
    [requestId, firstHand, secondHand] = Coders.decode(
      [uintCoder, stringCoder, stringCoder],
      request
    );
  } catch (error) {
    console.info("Malformed request received");
    return encodeReply([TYPE_ERROR, 0, errorToCode(error as Error)]);
  }
  let handles = [firstHand, secondHand];
  console.log(`Request received for profile ${handles}`);

  try {
    const respData = fetchLensApiStats(settings, handles);
    console.log(`Response data: ${respData}`);
    console.log("response:", [TYPE_RESPONSE, requestId, respData]);
    return encodeReply([TYPE_RESPONSE, requestId, respData]);
  } catch (error) {
    if (error === Error.FailedToFetchData) {
      throw error;
    } else {
      // otherwise tell client we cannot process it
      console.log("error:", [TYPE_ERROR, requestId, error]);
      return encodeReply([TYPE_ERROR, requestId, errorToCode(error as Error)]);
    }
  }
}
