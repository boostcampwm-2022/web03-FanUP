FROM node:18-alpine
WORKDIR /usr/src/server/gateway
# COPY ./server/gateway/package*.json .
COPY ./server/gateway .
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]