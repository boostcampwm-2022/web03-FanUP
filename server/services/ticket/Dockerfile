FROM node:18-alpine
WORKDIR /usr/src/server/services/ticket
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]