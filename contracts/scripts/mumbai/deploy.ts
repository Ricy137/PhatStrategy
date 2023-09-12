import { ethers } from "hardhat";
import "dotenv/config";
import dedent from "dedent";
import { parseEther } from "@phala/ethers";

async function main() {
  const PhatStrategy = await ethers.getContractFactory("PhatStrategy");

  const [deployer] = await ethers.getSigners();

  console.log("Deploying...");
  const attestor =
    process.env["MUMBAI_LENSAPI_ORACLE_ENDPOINT"] || deployer.address; // When deploy for real e2e test, change it to the real attestor wallet.
  const consumer = await PhatStrategy.deploy(attestor);
  await consumer.deployed();
  const finalMessage = dedent`
    🎉 Your Consumer Contract has been deployed, check it out here: https://mumbai.polygonscan.com/address/${consumer.address}
    
    You also need to set up the consumer contract address in your .env file:
    
    MUMBAI_CONSUMER_CONTRACT_ADDRESS=${consumer.address}
  `;
  console.log(`\n${finalMessage}\n`);

  console.log("Starting the game...");
  await consumer
    .connect(deployer)
    .startGame(
      "0xe52371e9182594c4568ac59c1991b84e78b7f9839c10e2dc5534ae089f84512f",
      ["wandagame", "cuckooir"],
      {
        value: parseEther("0.01"),
      }
    );
  console.log("Done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
