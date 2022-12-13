FROM node:18-alpine
WORKDIR /usr/src/server/services/core
COPY ./server/services/core .
COPY ./server/services/core/prisma ./prisma/ 
RUN npm install
ENV NODE_ENV production
# RUN npm run build
# CMD ["node", "dist/main"]
CMD ["npm", "start"]
EXPOSE 3002
EXPOSE 4002