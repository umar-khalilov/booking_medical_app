FROM node:18-alpine3.17 as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY ./ ./