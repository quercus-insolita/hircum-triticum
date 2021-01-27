FROM node:14.15-alpine

WORKDIR /app

ENV NODE_ENV development

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src src

RUN adduser -D -g "" api && \
    apk add --no-cache python2 make g++ && \
    npm run install:all && \
    npm run build

ENV NODE_ENV production

USER api
