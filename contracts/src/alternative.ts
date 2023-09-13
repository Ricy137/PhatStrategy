//DUE to Karma3 api is refusing service to me. This is an alternative Phat Function for PhatStrategy.
import "@phala/pink-env";
import { Coders } from "@phala/ethers";

type HexString = `0x${string}`;

// eth abi coder
const uintCoder = new Coders.NumberCoder(32, false, "uint256");
const stringCoder = new Coders.StringCoder("string");
const bytesCoder = new Coders.BytesCoder("bytes");

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

function isHexString(str: string): boolean {
  const regex = /^0x[0-9a-f]+$/;
  return regex.test(str.toLowerCase());
}

function stringToHex(str: string): string {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return "0x" + hex;
}

function fetchLensApiStats(lensApi: string, handle: string[]): any {
  if (handle[0] == handle[1]) return 0;
  let headers = {
    "Content-Type": "application/json",
    "User-Agent": "phat-contract",
  };
  let query1 = JSON.stringify({
    query: `query Profile {
            profile(request: { profileId: \"${handle[0]}\" }) {
                stats {
                    totalFollowers
                    totalFollowing
                }
            }
        }`,
  });
  let query2 = JSON.stringify({
    query: `query Profile {
            profile(request: { profileId: \"${handle[1]}\" }) {
                stats {
                    totalFollowers
                    totalFollowing
                }
            }
        }`,
  });
  let body1 = stringToHex(query1);
  let body2 = stringToHex(query2);
  // const firstUrl = `${lensApi}/profile/score?strategy=${rankStra}&handle=${handle[0]}`;
  // const secondUrl = `${lensApi}/profile/score?strategy=${rankStra}&handle=${handle[1]}`;
  try {
    let [res1, res2] = pink.batchHttpRequest(
      // [
      //   {
      //     url: firstUrl,
      //     method: "GET",
      //     headers,
      //     returnTextBody: true,
      //   },
      //   {
      //     url: secondUrl,
      //     method: "GET",
      //     headers,
      //     returnTextBody: true,
      //   },
      // ],
      [
        {
          url: lensApi,
          method: "POST",
          headers,
          body: body1,
          returnTextBody: true,
        },
        {
          url: lensApi,
          method: "POST",
          headers,
          body: body2,
          returnTextBody: true,
        },
      ],
      10000
    );
    if (res1.statusCode === 403 || res2.statusCode === 403) {
      throw "API rate limit exceeded";
    }
    if (res1.statusCode !== 200 || res2.statusCode !== 200) {
      console.log(
        `Fail to read Lens api with status code: ${res1.statusCode}, error: ${
          res1.error || res1.body
        }}`
      );
      console.log(
        `Fail to read Lens api with status code: ${res2.statusCode}, error: ${
          res2.error || res2.body
        }}`
      );
      throw Error.FailedToFetchData;
    }
    if (typeof res1.body !== "string" || typeof res2.body !== "string") {
      throw Error.FailedToDecode;
    }
    let res1Body = JSON.parse(res1.body);
    let res2Body = JSON.parse(res2.body);
    const rankStra = Math.random();
    let res = 0;
    if (rankStra < 0.5) {
      console.log(
        "toltal followers",
        res1Body.data.profile.stats.totalFollowers,
        res2Body.data.profile.stats.totalFollowers
      );
      res =
        res1Body.data.profile.stats.totalFollowers >
        res2Body.data.profile.stats.totalFollowers
          ? 1
          : res1Body.data.profile.stats.totalFollowers ===
            res2Body.data.profile.stats.totalFollowers
          ? 0
          : 2;
    } else {
      console.log(
        "toltal following",
        res1Body.data.profile.stats.following,
        res2Body.data.profile.stats.following
      );
      res =
        res1Body.data.profile.stats.totalFollowing >
        res2Body.data.profile.stats.totalFollowing
          ? 1
          : res1Body.data.profile.stats.totalFollowing ===
            res2Body.data.profile.stats.totalFollowing
          ? 0
          : 2;
    }
    // let res = res1Body.score > res2Body.score ? 1 : 2;
    return res;
  } catch (e) {
    console.log(e);
    throw Error.FailedToFetchData;
  }
}

function parseProfileId(hexx: string): string {
  var hex = hexx.toString();
  if (!isHexString(hex)) {
    throw Error.BadLensProfileId;
  }
  hex = hex.slice(2);
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    const ch = String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
    str += ch;
  }
  return str;
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
// PhatStrategy.sol for more details. We suggest a tuple of three elements: [successOrNotFlag, requestId, data] as
// the return value.
//
export default function main(request: HexString, settings: string): HexString {
  console.log(`handle req: ${request}`);
  let requestId, firstHand, secondHand;
  try {
    [requestId, firstHand, secondHand] = Coders.decode(
      [uintCoder, bytesCoder, bytesCoder],
      request
    );
  } catch (error) {
    console.info("Malformed request received");
    return encodeReply([TYPE_ERROR, 0, errorToCode(error as Error)]);
  }
  const profileId1 = parseProfileId(firstHand as string);
  const profileId2 = parseProfileId(secondHand as string);
  let handles = [profileId1, profileId2];
  console.log(`Request received for profile ${profileId1} ${profileId2}`);

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
