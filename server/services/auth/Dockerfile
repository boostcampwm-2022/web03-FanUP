FROM node:18-alpine
WORKDIR /usr/src/server/services/auth
COPY ./server/services/auth .
RUN npm install
ENV NODE_ENV production
RUN npx prisma generate
RUN npm run build
CMD ["node", "dist/main"]
EXPOSE 3001
EXPOSE 4001