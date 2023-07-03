// require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
// require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */


const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"

module.exports = {
    
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          // // If you want to do some forking, uncomment this
          // forking: {
          //   url: MAINNET_RPC_URL
          // }
          chainId: 31337,
      },
      localhost: {
          chainId: 31337,
      },
      polygon: {
          url: POLYGON_MAINNET_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          saveDeployments: true,
          chainId: 137,
      },
  },
  etherscan: {
      // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
      apiKey: {
          goerli: ETHERSCAN_API_KEY,
          polygon: POLYGONSCAN_API_KEY,
      },
      customChains: [
          {
              network: "goerli",
              chainId: 5,
              urls: {
                  apiURL: "https://api-goerli.etherscan.io/api",
                  browserURL: "https://goerli.etherscan.io",
              },
          },
      ],
  },
  // gasReporter: {
  //     enabled: REPORT_GAS,
  //     currency: "USD",
  //     outputFile: "gas-report.txt",
  //     noColors: true,
  //     // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  // },
  // contractSizer: {
  //     runOnCompile: false,
  //     only: ["Raffle"],
  // },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
          1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
      player: {
          default: 1,
      },
  },
  solidity: {
      compilers: [
          {
              version: "0.8.17",
          },
          {
              version: "0.4.24",
          },
      ],
  },
  mocha: {
      timeout: 500000, // 500 seconds max for running tests
},
}