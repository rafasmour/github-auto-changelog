FROM node:lts-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy source code
COPY . .

EXPOSE 80

# Set default command (can be overridden by docker-compose)
CMD ["npm", "run", "serve"]
