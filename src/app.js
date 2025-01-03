// Initialize Web3 with Ganache
const web3 = new Web3("http://localhost:8545"); // Ganache CLI URL

// Contract ABI and address
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "hashedProfile",
          "type": "string"
        }
      ],
      "name": "ProfileCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "profiles",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "verified",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "name": "createProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "verifyProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab"; // Your contract address here

// Declare contract after initializing web3
let contract = new web3.eth.Contract(contractABI, contractAddress);

// Assume you have a userAccount variable that holds the connected user's account address
let userAccount = null;

// Get the user's account
async function getUserAccount() {
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];
    console.log("Connected account:", userAccount);
}

// Create Profile function
async function createProfile() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Validate input
    if (!name || !email) {
        alert("Please enter both name and email!");
        return;
    }

    try {
        // Call createProfile function from the contract
        const receipt = await contract.methods.createProfile(name, email).send({ from: userAccount });
        console.log("Profile created successfully!", receipt);
        alert("Profile created successfully!");
    } catch (error) {
        console.error("Error creating profile:", error);
        alert("Error creating profile. Check the console for details.");
    }
}

// Verify Profile function
async function verifyProfile() {
    const address = document.getElementById("address").value;

    // Validate input
    if (!address) {
        alert("Please enter a user address!");
        return;
    }

    try {
        // Ensure the address is valid
        if (!web3.utils.isAddress(address)) {
            alert("Invalid Ethereum address!");
            return;
        }

        // Call verifyProfile function from the contract
        await contract.methods.verifyProfile(address).send({ from: userAccount });
        alert("Profile verified successfully!");
    } catch (error) {
        if (error.message.includes("Profile is already verified")) {
            alert("This profile is already verified!");
        } else {
            console.error("Error verifying profile:", error);
            alert("Error verifying profile. Check the console for details.");
        }
    }
}

// Get the user's account once the page loads
window.onload = async function() {
    await getUserAccount();
};
