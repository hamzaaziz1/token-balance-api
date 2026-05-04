const { ethers } = require("ethers");

// Minimal ABI for reading ERC-20 token data
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
];

// Creates a connection to the Ethereum network
function getProvider() {
  const rpcUrl = process.env.ETHEREUM_RPC_URL || "https://eth.llamarpc.com";
  return new ethers.JsonRpcProvider(rpcUrl);
}

// Fetches token metadata (name, symbol, decimals) from a contract address
async function getTokenInfo(tokenAddress) {
  const provider = getProvider();
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // Call all three read-only functions in parallel for speed
  const [name, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
  ]);

  return {
    address: tokenAddress,
    name,
    symbol,
    decimals: Number(decimals),
  };
}

// Fetches the token balance for a specific wallet address
async function getTokenBalance(tokenAddress, walletAddress) {
  const provider = getProvider();
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // Fetch balance, decimals, and symbol in parallel
  const [balance, decimals, symbol] = await Promise.all([
    contract.balanceOf(walletAddress),
    contract.decimals(),
    contract.symbol(),
  ]);

  return {
    tokenAddress,
    walletAddress,
    symbol,
    // Convert raw balance from smallest unit to human-readable format
    balance: ethers.formatUnits(balance, decimals),
    rawBalance: balance.toString(),
  };
}

module.exports = { getTokenInfo, getTokenBalance };