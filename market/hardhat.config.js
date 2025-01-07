require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = "a0780d6fde11441d254d246badfc2dfe98dfadc504d9491d8816d862a1e6d761";

module.exports = {
  solidity: "0.8.4",
  

  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks: {
    fuji: {
      chainId: 43113,
      url: `https://avalanche-fuji-c-chain-rpc.publicnode.com`,
      accounts: [PRIVATE_KEY],
    },
    AvalancheCChain: {
      chainId: 43114,
      url: `https://1rpc.io/avax/c`,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      chainId: 1337 // Hardhat default chain ID for local network
    },
    localhost: {
      url: "http://127.0.0.1:8545", // URL for local Hardhat node
      chainId: 1337
    },
    // If you plan to deploy to Infura testnets later:
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
    //   accounts: [`0x${YOUR_PRIVATE_KEY}`]
    // }
  },
};
