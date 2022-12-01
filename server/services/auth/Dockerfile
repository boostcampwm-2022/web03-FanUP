FROM node:18-alpine
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
RUN npm install
ENV NODE_ENV development
RUN npm run build
CMD ["node", "dist/main"]
EXPOSE 3001
EXPOSE 4001