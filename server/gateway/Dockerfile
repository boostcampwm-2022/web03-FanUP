FROM node:18-alpine
WORKDIR /usr/src/server/gateway
COPY ./server/gateway .
RUN npm install
ENV NODE_ENV production
RUN npm run build
CMD ["node", "dist/main"]