FROM node:18-alpine
WORKDIR /usr/src/server/gateway
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]