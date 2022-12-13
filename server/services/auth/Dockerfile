FROM node:18-alpine
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
COPY ./server/services/auth/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
CMD ["npx prisma generate && npm start"]
EXPOSE 3001
EXPOSE 4001