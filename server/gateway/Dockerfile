FROM node:18-alpine
WORKDIR /usr/src/server/gateway
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]