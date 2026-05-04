<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Containerize a Blockchain API with Docker

**Project Link:** [View Project](https://learn.nextwork.org/projects/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881)

**Author:** Hamza Aziz  
**Email:** hamzaaziz5874@gmail.com

---

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_ga5qc7um)

## Project Vision: Blockchain API Infrastructure

### What this project builds and why it matters

In this project, you will build a REST API that reads ERC-20 token data from the Ethereum blockchain, package it inside a Docker container, automate testing and builds with a CI/CD pipeline, and deploy it live to the internet.

## Setting Up the Development Environment

### Docker Desktop and project scaffold

Install Docker Desktop with the WSL 2 backend.

Create the project folder and install dependencies.

Set up the file and folder structure for your API.

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_848wiokn)

### Core dependencies and their roles

express@5.2.1 is the web framework that handles HTTP requests and routing for your API.



ethers@6.16.0 is the library for connecting to the Ethereum blockchain and interacting with smart contracts.



dotenv@16.5.0 loads environment variables from a .env file into your app. This keeps config like RPC URLs out of your source code.

## Building the Blockchain Service and REST API

### Connecting to Ethereum with ethers.js

Write a blockchain service that reads ERC-20 token data from Ethereum.

Create API routes that expose token data over HTTP.

Wire up the Express server and verify it runs locally.

### Exported service functions

getTokenBalance returns the balance of a wallet wrt to the token, getTokenInfo gets the info of the token

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_580kowjm)

## Writing Tests and Containerizing with Docker

### Test setup and Dockerfile creation

Write a health check test and run it with Jest.

Create a Dockerfile to containerize your API.

Build and run the Docker container locally.

### Understanding dynamic port assignment in tests

server on port 0, which tells the OS to pick any available port. This avoids conflicts with other processes.

### Docker layer caching strategy

The main advantage of copying package.json before your source code is dramatically faster build times by leveraging Docker's layer caching.Docker builds images in layers, and each instruction (like COPY or RUN) creates a new layer. When you rebuild an image:Cache Invalidation: If any file in a COPY instruction has changed, Docker invalidates the cache for that layer and every layer that follows it.Separation of Concerns: Source code changes frequently, but dependencies change rarely. By copying only the package.json and package-lock.json first, you create a "dependencies layer".

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_slbwx6of)

## Automating CI/CD with GitHub Actions

### Setting up the automated pipeline

Push your project to a public GitHub repository.

Create a GitHub Actions workflow that runs tests and builds your Docker image.

Verify the pipeline triggers automatically on every push.

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_lurzfk55)

### What the pipeline does on every push

CI (Continuous Integration) — Automatically builds and tests your code on every push. Catches bugs before they reach production.



CD (Continuous Deployment/Delivery) — Automatically deploys your code to a live server after CI passes. No manual steps needed.

Think of it as an assembly line: you push code → it gets built → tested → deployed, all without you lifting a finger. 

## Deploying a Live API on Render

### Connecting GitHub to Render for auto-deployment

Create a Render account and connect your GitHub repos.

Deploy your API as a Docker-based web service on Render's free tier.

Test your live API endpoints with a real ERC-20 token address.

![Image](https://learn.nextwork.org/curious_white_noble_basil/uploads/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881_mc59yswq)

### Live deployment URL

My deployed health endpoint URL is https://token-balance-api-6xxo.onrender.com/health

## Secret Mission: Deploying a Custom Sepolia Contract

### Providers vs signers for read and write operations

## Reflections and Key Takeaways

### Tools and concepts mastered

Key Tools





Node.js + Express — Built a REST API with routes, services, and a health endpoint



ethers.js — Connected to the Ethereum blockchain to read live ERC-20 token data



Docker — Containerized your app so it runs consistently anywhere



GitHub Actions — Set up a CI pipeline that automatically tests your code on every push



Render — Deployed your API to a live public URL



Git — Version control with staging, committing, and pushing to remote repos

Key Lessons





Separation of concerns — Splitting your code into routes/ (what the API responds to) and services/ (how the work gets done)



RPC reliability matters — Public endpoints can be flaky; knowing how to swap providers is a real-world skill



Docker permissions — You tackled Docker daemon permission issues with usermod -aG docker



GitHub PAT scopes — Learned that pushing workflow files requires the workflow scope on your Personal Access Token



CI/CD mindset — Automating your build → test → deploy pipeline so


### Time and challenges

1 hour

### Learning goals and next steps

Thanks

---

*Built with [NextWork](https://learn.nextwork.org) - [View this project](https://learn.nextwork.org/projects/1a8cf2b8-1bc8-4ca9-8a8f-d37b239f7881)*
