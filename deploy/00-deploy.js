const { ethers, network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
 
module.exports = async () => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")

    const Creator = await deploy("ExchangeModerator", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const PolygonWalletsManager = await deploy("PolygonWalletsManager", {
        from: deployer,
        args: [ethers.utils.parseEther("1"),5],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

}

module.exports.tags = ["all", "creators"]