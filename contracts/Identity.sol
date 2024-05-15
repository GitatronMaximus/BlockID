// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/AccessControl.sol";


contract Identity is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address private _owner;

    struct IdentityData {
        bytes32 data;
        bool isActive;
    }
    
    mapping(address => IdentityData) public identities;

    event IdentityAdded(address indexed user, string identityData);
    event IdentityUpdated(address indexed user, string identityData);
    event IdentityDeleted(address indexed user);



constructor() {
    _owner = msg.sender;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(ADMIN_ROLE, msg.sender);
}

    function owner() public view returns (address) {
        return _owner;
    }

    function addAdmin(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, user);
    }

    function removeAdmin(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ADMIN_ROLE, user);
    }
    // Generate a salt for a new identity
    function generateSalt() private view returns (bytes32) {
            return keccak256(abi.encodePacked(block.timestamp, msg.sender));
    }

    // Add an identity to the mapping
    // Add identity function that accepts a string and converts to bytes32
    function addIdentity(string memory identityData) public {
        require(bytes(identityData).length > 0, "Identity data cannot be empty");
        require(identities[msg.sender].data == bytes32(0), "Identity already exists.");
        bytes32 identityHash = keccak256(abi.encodePacked(identityData, generateSalt()));
        identities[msg.sender] = IdentityData({data: keccak256(abi.encodePacked(generateSalt(), identityData)), isActive: true});
        identities[msg.sender] = IdentityData({data: identityHash, isActive: true});
        emit IdentityAdded(msg.sender, identityData);
    }

    // Update an existing identity
    function updateIdentity(string memory identityData) public {
        require(bytes(identityData).length > 0, "Identity data cannot be empty");
        require(identities[msg.sender].data != bytes32(0) && identities[msg.sender].isActive, "Identity does not exist.");
        bytes32 identityHash = keccak256(abi.encodePacked(identityData, generateSalt()));
        identities[msg.sender] = IdentityData({data: keccak256(abi.encodePacked(generateSalt(), identityData)), isActive: true});
        identities[msg.sender] = IdentityData({data: identityHash, isActive: true});
        emit IdentityUpdated(msg.sender, identityData);

    }

    function deleteIdentity() public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Requires ADMIN_ROLE");
        require(identities[msg.sender].isActive, "No active identity to delete.");

        identities[msg.sender].isActive = false;
        emit IdentityDeleted(msg.sender);
    }

    function getIdentity(address user) public view returns (bytes32) {
        if (identities[user].isActive) {
            return identities[user].data;
        } else {
            return bytes32(0); //returns a zero value for deleted or inactive identities
        }
    } //allows users to create and retrieve identities
}
