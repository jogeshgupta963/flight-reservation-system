FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

RUN npm run prisma:generate
RUN npx prisma migrate dev --name mign
CMD [ "npm","run","start" ]
