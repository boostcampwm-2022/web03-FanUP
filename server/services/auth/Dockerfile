FROM node:18-alpine
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]