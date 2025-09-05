FROM node:lts-alpine

WORKDIR /api

COPY package*.json ./
RUN npm ci
# install git for simple-git
RUN apk add --no-cache git

COPY . .
EXPOSE 80