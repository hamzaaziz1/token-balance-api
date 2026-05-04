const express = require("express");
const router = express.Router();
const { getTokenInfo, getTokenBalance } = require("../services/blockchain");

// GET /api/token/:address - Returns token metadata
router.get("/:address", async (req, res) => {
  try {
    const tokenInfo = await getTokenInfo(req.params.address);
    res.json(tokenInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/token/:tokenAddress/balance/:walletAddress - Returns token balance
router.get("/:tokenAddress/balance/:walletAddress", async (req, res) => {
  try {
    const balance = await getTokenBalance(
      req.params.tokenAddress,
      req.params.walletAddress
    );
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;