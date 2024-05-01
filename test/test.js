const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Identity Contract", function () {
  let Identity;
  let identity;
  let owner;
  let addr1;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Identity = await ethers.getContractFactory("Identity");
        [owner, addr1] = await ethers.getSigners();
        
        const HashZero = '0x' + '0'.repeat(64); // This creates a string with 64 zeros after '0x'


        // Deploy a new contract before each test.
        identity = await Identity.deploy();
    });

    describe("generateSalt function", function() {
        it("should generate a unique salt each time an identity is added", async function() {
            // Add identity for the owner
            await identity.addIdentity("Owner Identity");
            const ownerIdentity1 = await identity.getIdentity(owner.address);

            // Wait for a different block timestamp
            await network.provider.send("evm_increaseTime", [2]); // increase blockchain time by 2 seconds
            await network.provider.send("evm_mine"); // mine another block

            // Add another identity for the owner
            await identity.addIdentity("Owner New Identity");
            const ownerIdentity2 = await identity.getIdentity(owner.address);

            // Check if the salts (and hence hashed identities) are different
            expect(ownerIdentity1).to.not.equal(ownerIdentity2, "Salts should be different resulting in different hashes");
        });

        it("should generate a unique salt for different users", async function() {
            // Add identity for the owner
            await identity.connect(owner).addIdentity("Owner Identity");
            const ownerIdentity = await identity.getIdentity(owner.address);

            // Add identity for another user
            await identity.connect(addr1).addIdentity("User Identity");
            const user1Identity = await identity.getIdentity(addr1.address);

            // Check if the salts (and hence hashed identities) are different
            expect(ownerIdentity).to.not.equal(user1Identity, "Salts should be different for different users");
        });
    });

        describe("Deployment", function () {
            it("Should set the right owner", async function () {
                // Check if the contract is deployed by the owner.
                expect(await identity.owner()).to.equal(owner.address);
            });

            it("Should deploy successfully with an initial state", async function () {
                // Check if the initial state of `identities` mapping is empty for any address.
                const expectedZeroValue = '0x' + '0'.repeat(64);  // This represents a bytes32 zero value
                expect(await identity.getIdentity(addr1.address)).to.equal(expectedZeroValue);
            });

        describe("Operations", function () {
            it("Should allow adding an identity", async function () {
                // Pass a normal string directly
                const testIdentityData = "user1";
                await identity.addIdentity(testIdentityData);
        
                // Compute the expected bytes32 value using ethers.js in the test for verification
                const expectedBytes32 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(testIdentityData));
                expect(await identity.getIdentity(owner.address)).to.equal(expectedBytes32);

            });
            
              it("Should prevent adding an identity if it already exists", async function () {
                // Manually convert string to bytes32 format
                const testIdentityData = toBytes32("user1");
                await identity.addIdentity(testIdentityData);
            
                // Attempt to add the same identity again should fail.
                await expect(identity.addIdentity(testIdentityData)).to.be.revertedWith("Identity already exists.");
            });
        });
    });
})
