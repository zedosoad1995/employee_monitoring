FROM node:16-alpine

WORKDIR /usr/src

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm install
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci --omit=dev
COPY --from=0 /usr/src/dist .
COPY --from=0 /usr/src/prisma ./prisma

RUN npm run generate

RUN npm install pm2 -g

ARG PORT

EXPOSE ${PORT}
CMD ["pm2-runtime","src/bin/www.js"]