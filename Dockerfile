# syntax=docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install packages and copy the application code to the container
COPY package-lock.json package.json ./
RUN npm ci --only=production

COPY . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "startDeployed" ]