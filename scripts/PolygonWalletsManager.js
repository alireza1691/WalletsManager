const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const { formatEther } = require("ethers/lib/utils");
const {hre, ethers, network, getNamedAccounts, deployments} = require("hardhat");
// const { ethers } = require("ethers")

async function main() {
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  const PolygonWalletsManager = await deployments.get("PolygonWalletsManager")
  const PolygonWalletsManagerContract = await ethers.getContractAt(PolygonWalletsManager.abi,PolygonWalletsManager.address)

  await PolygonWalletsManagerContract.deposit(deployer.address,{value: ethers.utils.parseEther("10")})
  const balance = await PolygonWalletsManagerContract.showBalance(deployer.address)
  console.log(balance.toString());

  await PolygonWalletsManagerContract.internalTransfer(user.address, ethers.utils.parseEther("1"))
  const userBal = await PolygonWalletsManagerContract.showBalance(user.address)
  console.log("Balance of account 2 after internal transfer:", userBal.toString());

//   await PolygonWalletsManagerContract.transfer(user.address,ethers.utils.parseEther("1"))
//   const maticBalAcc2 = await 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
