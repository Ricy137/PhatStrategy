import { randomBytes, toBigInt, AbiCoder, keccak256 } from "ethers";

//cryptographically secure
export const randomBytes256 = () => {
  let salt = toBigInt(randomBytes(32));
  return `0x${salt.toString(16)}`;
};

export const keccak256Hash = (types: string[], values: string[]) => {
  let abiCoder = new AbiCoder();
  let bytes = abiCoder.encode([...types], [...values]);
  return keccak256(bytes);
};

export const decodeData = (types: string[], data: string) => {
  let abiCoder = new AbiCoder();
  let decodedData = abiCoder.decode([...types], data);
  return decodedData;
};
