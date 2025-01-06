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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "ProfileVerified",
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
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "verifyProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
  ];
const contractAddress = "0xde74d11fcb38f4eec05efb50992af937eb88c484"; // Your contract address here

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
    const email = document.getElementById("email").value;

    // Validate input
    if (!email) {
        alert("Please enter an email!");
        return;
    }

    try {
        // Call the updated verifyProfile function
        await contract.methods.verifyProfile(email).send({ from: userAccount });
        alert("Profile verified successfully!");
    } catch (error) {
        if (error.message.includes("Profile is already verified")) {
            alert("This profile is already verified!");
        } else if (error.message.includes("Profile with this email does not exist")) {
            alert("No profile found with this email!");
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
