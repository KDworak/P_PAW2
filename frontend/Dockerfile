FROM node:18-alpine

RUN npm install -g npm@10.5.2

RUN mkdir -p /app

WORKDIR /app

COPY /package*.json ./

RUN npm i

COPY . /app

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]