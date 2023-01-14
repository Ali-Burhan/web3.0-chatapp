
const hre = require("hardhat");

async function main() {
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatapp = await ChatApp.deploy();

  await chatapp.deployed();

  console.log(`Contract address :${chatapp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
