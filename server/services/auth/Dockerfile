FROM node:18-alpine
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
COPY ./server/services/auth/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
RUN npx prisma db pull && prisma generate
CMD ["npm", "start"]
EXPOSE 3001
EXPOSE 4001