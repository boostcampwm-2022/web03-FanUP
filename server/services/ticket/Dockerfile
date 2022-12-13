FROM node:18-alpine
WORKDIR /usr/src/server/services/ticket
COPY ./server/services/ticket .
COPY ./server/services/ticket/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
CMD ["npx prisma generate && npm start"]
EXPOSE 3003