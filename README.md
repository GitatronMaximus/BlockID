# BlockID
Identity Verification DApp

## Overview
This decentralized application (DApp) enables users to create, update, and retrieve on-chain identities. Designed for use in various sectors such as finance, healthcare, and education, the Identity Verification DApp aims to provide a secure and reliable method of managing digital identities on the Ethereum blockchain.

## Features
Create Identity: Users can register a new identity by entering personal details, which are then hashed and stored securely on the blockchain.

Update Identity: Existing users can update their identity information. Updates are also hashed and securely stored.

Retrieve Identity: Users can retrieve and verify their identity information using their unique blockchain address.
Technologies Used

Ethereum: As the blockchain platform.

Solidity: Smart contracts are written in Solidity for creating, updating, and storing identity information.

IPFS: Used for storing identity documents in a decentralized manner.

React: For the frontend user interface.

Web3.js/Ethers.js: Libraries used to interact with Ethereum from the web interface.

## How to Use
Installation

1. Clone the repository:

git clone https://github.com/GitatronMaximus/BlockID

2. Install dependencies:

npm install

3. Setting Up Local Blockchain
Run Ganache or any local Ethereum blockchain.

    Deploy contracts:
    

 css:   truffle migrate --reset

4. Running the DApp
    
    Start the frontend application:

sql:    npm start

5. Access the DApp in a web browser at http://localhost:3000.

## Interacting with the DApp
Connect your Ethereum wallet (e.g., MetaMask).

Follow the UI prompts to create, update, or retrieve an identity.

## Smart Contract Methods

 1.   addIdentity(string memory identityData): Adds a new identity to the blockchain.
 2.   updateIdentity(string memory identityData): Updates an existing identity.
 3.   getIdentity(address user): Retrieves identity data for a specific user.
        
## Security Considerations
All identity data is hashed before being stored on the blockchain to ensure privacy and security.
Contract functions are protected against unauthorized access using Ethereum's address-based permission system.

## Contributing
Contributions are welcome! Please feel free to submit pull requests or create issues for bugs, suggestions, or enhancements.