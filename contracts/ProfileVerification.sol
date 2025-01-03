// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileVerification {
    mapping(address => string) public profiles;
    mapping(address => bool) public verified;
    
    event ProfileCreated(address user, string hashedProfile);
    event ProfileVerified(address user);

    // Function to store user profile data (name and email)
    function createProfile(string memory name, string memory email) public {
        // Hash the name and email to save in the contract (or store them directly)
        string memory hashedProfile = string(abi.encodePacked(name, email));
        profiles[msg.sender] = hashedProfile; // Store the hashed data
        emit ProfileCreated(msg.sender, hashedProfile);
    }

    // Function to get profile data (hashed)
    function getProfile(address user) public view returns (string memory) {
        return profiles[user];
    }

    // Function to verify the profile
    function verifyProfile(address user) public {
        require(bytes(profiles[user]).length > 0, "Profile does not exist");
        require(!verified[user], "Profile is already verified"); // New check
        verified[user] = true;
        emit ProfileVerified(user); // Emit an event for successful verification
    }
}
