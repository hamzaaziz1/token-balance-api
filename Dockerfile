# Use a lightweight Node.js 20 image based on Alpine Linux
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the application source code
COPY src ./src

# Document which port the container listens on
EXPOSE 3000

# Start the API server
CMD ["node", "src/index.js"]