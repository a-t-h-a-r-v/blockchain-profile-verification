module.exports = {
    contracts_directory: './contracts',
    contracts_build_directory: './build/contracts',
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
        },
    },
    compilers: {
        solc: {
            version: "0.8.0",  // Specify the Solidity compiler version
        },
    },
};
