FROM node:18-alpine
WORKDIR /usr/src/server/services/core
COPY ./server/services/core .
RUN npm install
ENV NODE_ENV development
RUN npm run build
CMD ["node", "dist/main"]