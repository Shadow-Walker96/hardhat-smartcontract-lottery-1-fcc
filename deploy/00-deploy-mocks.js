// 14:57:45 -----> Deploying raffle.sol

const { network, ethers } = require("hardhat");

const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium from chainlink oracle VRF, it costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // link per gas, this is a calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks.....")
        // deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args
        })
        log("Mocks Deployed!")
        log("------------------------------------------------")

    }
}

module.exports.tags = ["all", "mocks"]