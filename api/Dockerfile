FROM node:lts-alpine

WORKDIR /api

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Install git for simple-git
RUN apk add --no-cache git

# Copy source code
COPY . .

EXPOSE 80

# Set default command (can be overridden by docker-compose)
CMD ["npm", "run", "start:prod"]
