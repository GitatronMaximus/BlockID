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
            await identity.connect(owner).addIdentity("Owner Identity");
            const ownerIdentity1 = await identity.getIdentity(owner.address);
        
            // Add identity for another user to ensure unique salts even if data is similar
            await identity.connect(addr1).addIdentity("Owner Identity");
            const addr1Identity = await identity.getIdentity(addr1.address);
        
            // Check if the salts (and hence hashed identities) are different
            expect(ownerIdentity1).to.not.equal(addr1Identity, "Salts should be different resulting in different hashes");
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
            it("Should allow adding an identity and store a non-empty hash", async function () {
                const testIdentityData = "user1";
                await identity.addIdentity(testIdentityData);
              
                // Retrieve the hashed identity from the contract after adding
                const storedHash = await identity.getIdentity(owner.address);
              
                // Expect that the stored hash is not an empty bytes32 string (indicating non-zero or non-empty)
                expect(storedHash).to.not.equal('0x' + '0'.repeat(64), "The identity hash should not be empty.");
            });
            
            it("Should prevent adding an identity if it already exists", async function () {
                const testIdentityData = "user1";
                await identity.addIdentity(testIdentityData); // First time adding should work
            
                // Try to add the same identity again should fail.
                await expect(identity.addIdentity(testIdentityData)).to.be.revertedWith("Identity already exists.");
            });
        });

        describe("Edge Case Handling", function () {
            it("Should revert when adding an identity with an empty string", async function () {
                await expect(identity.addIdentity("")).to.be.revertedWith("Identity data cannot be empty"); 
            });          
            it("Should revert when updating ing an identity with an empty string", async function () {
                await expect(identity.updateIdentity("")).to.be.revertedWith("Identity data cannot be empty");
            });
            it("Should handle adding an identity with a very long string", async function () {
                const longString = 'a'.repeat(10000); // 10,000 characters long
                await identity.addIdentity(longString);
    
                // Retrieve the hashed identity from the contract after adding
                const storedHash = await identity.getIdentity(owner.address);
    
                // Expect that the stored hash is not an empty bytes32 string (indicating non-zero or non-empty)
                expect(storedHash).to.not.equal('0x' + '0'.repeat(64), "The identity hash should not be empty.");
            });
           
        });

        describe("Special Characters and Binary Data Handling", function () {
            it("Should handle identities with special characters", async function () {
                const specialCharData = "JohnDoe@123#%&";
                await identity.addIdentity(specialCharData);
                const storedHash = await identity.getIdentity(owner.address);
                expect(storedHash).to.not.equal('0x' + '0'.repeat(64), "Identity hash should not be empty.");
            });
    
            it("Should handle identities with binary data", async function () {
                // Convert binary data to a hex string
                const binaryData = Buffer.from("binary\x00\x01\x02");
                const hexData = ethers.hexlify(binaryData);
            
                // Use the hex data to add identity
                await identity.addIdentity(hexData);
                const storedHash = await identity.getIdentity(owner.address);
            
                // Check that the stored hash is not the zero value
                expect(storedHash).to.not.equal('0x' + '0'.repeat(64), "Identity hash should not be empty.");
            });
        });
        
    });
})
