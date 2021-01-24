FROM node:14.15-alpine

WORKDIR /app

ENV NODE_ENV development

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src src

RUN npm install
