FROM node:18-alpine
WORKDIR /usr/src/server/services/ticket
COPY ./server/services/ticket .
RUN npm install
ENV NODE_ENV production
RUN npx prisma generate
RUN npm run build
CMD ["node", "dist/main"]
EXPOSE 3003