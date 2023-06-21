const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const { formatEther } = require("ethers/lib/utils");
const {hre, ethers, network, getNamedAccounts, deployments} = require("hardhat");
// const { ethers } = require("ethers")

async function main() {
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  const moderator =await deployments.get("ExchangeModerator")
  // console.log(moderator);
  console.log("******************************************************************");
  console.log("******************************************************************");
  const moderatorContract = await ethers.getContractAt(moderator.abi,moderator.address)
  // console.log(moderatorContract);

  const creation = await moderatorContract.newWallet(2);
  const tx = await creation.wait(1)
  console.log(tx.events[0].args.walletContractAddress);
  const check = await moderatorContract.userWallet(deployer.address)
  console.log(check);
  // const contractWalletModerator = await ethers.

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
