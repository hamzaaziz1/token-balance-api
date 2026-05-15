# 🪙 Token Balance API

A containerized REST API that reads live ERC-20 token data from the Ethereum blockchain. Built with Node.js and Express, containerized with Docker, tested with automated CI/CD via GitHub Actions, and deployed to Render.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-Mainnet-3C3C3D?logo=ethereum&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Lessons Learned](#lessons-learned)
- [License](#license)

---

## Overview

Token Balance API is a backend service that connects to the Ethereum blockchain and exposes ERC-20 token data through simple HTTP endpoints. Instead of interacting directly with smart contracts, users can query token metadata and wallet balances via clean REST API calls.

**Live Demo:** [https://token-balance-api-6xxo.onrender.com/health](https://token-balance-api-6xxo.onrender.com/health)

---

## Features

- 🔗 **Live Blockchain Data** — Reads real-time ERC-20 token metadata (name, symbol, decimals) directly from Ethereum mainnet
- 💰 **Wallet Balance Lookup** — Query any wallet's token balance for any ERC-20 contract
- 🐳 **Dockerized** — Fully containerized for consistent, portable deployment
- ⚡ **Parallel Queries** — Uses `Promise.all()` for concurrent contract calls, reducing response times
- 🧪 **Automated Testing** — CI pipeline runs tests on every push via GitHub Actions
- 🚀 **Cloud Deployed** — Live on Render with health monitoring
- 🏗️ **Clean Architecture** — Separation of concerns with dedicated routes and services layers

---

## Architecture

```
Client Request
      │
      ▼
┌─────────────┐
│   Express    │   ← Routes layer (src/routes/)
│   Router     │     Handles HTTP requests & error responses
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Blockchain  │   ← Service layer (src/services/)
│   Service    │     Business logic & Ethereum interaction
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Ethereum    │   ← External dependency
│  RPC Node   │     ethers.js connects via JSON-RPC
└─────────────┘
```

---

## Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| **Runtime**    | Node.js 18+                         |
| **Framework**  | Express.js                          |
| **Blockchain** | ethers.js v6, Ethereum Mainnet      |
| **Container**  | Docker                              |
| **CI/CD**      | GitHub Actions                      |
| **Deployment** | Render                              |
| **Config**     | dotenv                              |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized setup)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/hamzaaziz1/token-balance-api.git
cd token-balance-api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
ETHEREUM_RPC_URL=https://rpc.ankr.com/eth
```

> **Note:** The public RPC works for development. For production, consider using
> [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/) for
> better reliability.

### Running Locally

```bash
node src/index.js
```

You should see:

```
Token Balance API running on port 3000
```

Verify it's working:

```bash
curl http://localhost:3000/health
# → {"status":"ok"}
```

---

## API Endpoints

### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

---

### Get Token Info

```
GET /api/token/:address
```

Returns metadata for any ERC-20 token contract.

**Example:**
```bash
curl http://localhost:3000/api/token/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
```

**Response:**
```json
{
  "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "name": "USD Coin",
  "symbol": "USDC",
  "decimals": 6
}
```

---

### Get Token Balance

```
GET /api/token/:tokenAddress/balance/:walletAddress
```

Returns the token balance for a specific wallet address.

**Example:**
```bash
curl http://localhost:3000/api/token/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/balance/0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503
```

**Response:**
```json
{
  "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "walletAddress": "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503",
  "symbol": "USDC",
  "balance": "1250000.50",
  "rawBalance": "1250000500000"
}
```

---

## Docker

### Build the image

```bash
docker build -t token-balance-api .
```

### Run the container

```bash
docker run -p 3000:3000 --env-file .env token-balance-api
```

### Verify

```bash
curl http://localhost:3000/health
# → {"status":"ok"}
```

---

## CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration. On every push to `main`:

1. ✅ Checks out the code
2. ✅ Sets up Node.js
3. ✅ Installs dependencies
4. ✅ Runs automated tests
5. ✅ Builds the Docker image

The workflow is defined in `.github/workflows/ci.yml`.

---

## Deployment

The API is deployed on **Render** as a Web Service.

**Live URL:** `https://token-balance-api-6xxo.onrender.com`

### Deploy your own:

1. Push the repo to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Environment Variable:** `ETHEREUM_RPC_URL` = your preferred RPC URL
5. Deploy 🚀

> **Note:** Render automatically sets the `PORT` environment variable.

---

## Project Structure

```
token-balance-api/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── src/
│   ├── routes/
│   │   └── token.js            # API endpoint definitions
│   ├── services/
│   │   └── blockchain.js       # Ethereum blockchain interaction logic
│   └── index.js                # Express server entry point
├── .env                        # Environment variables (not committed)
├── .gitignore
├── Dockerfile                  # Container configuration
├── package.json
├── package-lock.json
└── README.md
```

---

## Lessons Learned

- **Separation of Concerns** — Structuring code into routes (HTTP handling) and services (business logic) makes the codebase maintainable and testable
- **RPC Reliability** — Public Ethereum RPC endpoints can be unreliable; having fallback providers is essential for production
- **Docker Permissions** — Linux Docker daemon requires user group configuration (`usermod -aG docker $USER`)
- **GitHub PAT Scopes** — Pushing workflow files to `.github/workflows/` requires the `workflow` scope on Personal Access Tokens
- **CI/CD Value** — Automating build → test → deploy catches bugs early and removes manual deployment steps
- **Environment Configuration** — Using `dotenv` and environment variables keeps secrets out of code and makes deployment flexible

---

## License

This project is licensed under the MIT License.

---

Built with ☕ by [Hamza Aziz](https://github.com/hamzaaziz1)
