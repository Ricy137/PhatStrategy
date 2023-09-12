import { ethers } from "hardhat";
import "dotenv/config";
import { parseEther } from "@phala/ethers";

async function main() {
  const PhatStrategy = await ethers.getContractFactory("PhatStrategy");

  const [deployer] = await ethers.getSigners();

  console.log("Deploying...");
  const consumer = await PhatStrategy.deploy(deployer.address);
  await consumer.deployed();
  console.log("Deployed", {
    consumer: consumer.address,
  });
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
