require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // This should be at the very top

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
    networks: {
      hardhat: {
        // Configuration for the Hardhat Network
        chainId: 31337, // Standard chain ID for local Hardhat network
        allowUnlimitedContractSize: false,
        blockGasLimit: 10000000 // Adjust block gas limit as necessary
      },
      // Example configuration for Rinkeby testnet
      sepolia: {
        url: "https://sepolia.infura.io/v3/3608827068984ed1b37d41bf015f6ea0",
        accounts: [process.env.PRIVATE_KEY]
      }
    },
};
