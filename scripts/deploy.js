import { ethers } from 'hardhat';

async function deploy() {
  console.log("Starting deployment...");
  try {
    const Identity = await ethers.getContractFactory("Identity");
    console.log("Contract factory obtained.");

    // Deploy the contract
    const identity = await Identity.deploy();
    console.log("Deploy function called.");

    // Wait for the deployment to be mined
    console.log("Deployment transaction mined.");

    // Check if the identity object is valid and has an address
    if (identity && identity.address) {
      console.log("Contract deployed to address:", identity.address);
    } else {
      console.error("Deployment successful, but no address found.");
    }

    // Confirm deployment by fetching the current block number
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    console.log("Deployment confirmed at block number:", currentBlockNumber);
  } catch (error) {
    console.error("Deployment failed with error:", error);
  }
}

deploy();
