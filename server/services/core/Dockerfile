FROM node:18-alpine
WORKDIR /usr/src/server/services/core
COPY ./server/services/core .
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]