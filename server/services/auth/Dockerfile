FROM node:16-bullseye-slim
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
COPY ./server/services/auth/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
CMD ["npm", "run", "production"]
EXPOSE 3001
EXPOSE 4001