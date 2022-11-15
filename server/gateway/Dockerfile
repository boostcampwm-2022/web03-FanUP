FROM node:18-alpine
WORKDIR /usr/src/server/gateway
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/main"]