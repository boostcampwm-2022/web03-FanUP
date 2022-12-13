FROM node:18-alpine
WORKDIR /usr/src/server/services/core
COPY ./server/services/core .
RUN npm install
ENV NODE_ENV production
RUN npx prisma db pull && prisma generate
RUN npm run build
CMD ["node", "dist/main"]
EXPOSE 3002
EXPOSE 4002