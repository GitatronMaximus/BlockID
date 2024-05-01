// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Identity {
    mapping(address => bytes32) public identities;

    event IdentityAdded(address indexed user, string identityData);
    event IdentityUpdated(address indexed user, string identityData);

address public owner;

constructor() {
    owner = msg.sender;
}
    // Generate a salt for a new identity
    function generateSalt() private view returns (bytes32) {
            return keccak256(abi.encodePacked(block.timestamp, msg.sender));
    }

    // Add an identity to the mapping
    // Add identity function that accepts a string and converts to bytes32
    function addIdentity(string memory identityData) public {
        require(identities[msg.sender] == bytes32(0), "Identity already exists.");
        bytes32 identityHash = keccak256(abi.encodePacked(identityData, generateSalt()));
        identities[msg.sender] = keccak256(abi.encodePacked(generateSalt(), identityData));
        identities[msg.sender] = identityHash;
        emit IdentityAdded(msg.sender, identityData);
    }

    // Update an existing identity
    function updateIdentity(string memory identityData) public {
        require(identities[msg.sender] != bytes32(0), "Identity does not exist.");
        bytes32 identityHash = keccak256(abi.encodePacked(identityData, generateSalt()));
        identities[msg.sender] = keccak256(abi.encodePacked(generateSalt(), identityData));
        identities[msg.sender] = identityHash;
        emit IdentityUpdated(msg.sender, identityData);

    }

    function getIdentity(address user) public view returns (bytes32) {
        return identities[user];
    } //allows users to create and retrieve identities
}
