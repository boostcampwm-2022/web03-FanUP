FROM node:16-bullseye-slim
WORKDIR /usr/src/server/services/ticket
COPY ./server/services/ticket .
COPY ./server/services/ticket/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
CMD ["npm", "run", "production"]
EXPOSE 3003