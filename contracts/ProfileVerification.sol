// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileVerification {
    mapping(address => string) public profiles;
    mapping(string => address) public emailToAddress; // New mapping for email to address
    mapping(address => bool) public verified;

    event ProfileCreated(address user, string hashedProfile);
    event ProfileVerified(address user);

    // Function to store user profile data (name and email)
    function createProfile(string memory name, string memory email) public {
        // Ensure the email is unique
        require(emailToAddress[email] == address(0), "Email is already registered");
        
        // Hash the name and email to save in the contract (or store them directly)
        string memory hashedProfile = string(abi.encodePacked(name, email));
        profiles[msg.sender] = hashedProfile; // Store the hashed data
        emailToAddress[email] = msg.sender; // Map email to address
        emit ProfileCreated(msg.sender, hashedProfile);
    }

    // Function to verify the profile using email
    function verifyProfile(string memory email) public {
        address user = emailToAddress[email]; // Fetch address from email
        require(user != address(0), "Profile with this email does not exist");
        require(!verified[user], "Profile is already verified");
        verified[user] = true;
        emit ProfileVerified(user); // Emit an event for successful verification
    }
}
