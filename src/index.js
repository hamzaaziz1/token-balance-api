// Token Balance API
const express = require("express");
const dotenv = require("dotenv");
const tokenRoutes = require("./routes/token");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint for monitoring and deployment checks
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mount token routes under /api/token
app.use("/api/token", tokenRoutes);

// Only start the server when this file is run directly (not imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Token Balance API running on port ${PORT}`);
  });
}

module.exports = app;