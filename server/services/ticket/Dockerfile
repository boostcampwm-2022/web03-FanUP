FROM node:18-alpine
WORKDIR /usr/src/server/services/ticket
COPY ./server/services/ticket .
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]