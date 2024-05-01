FROM node:lts AS build
RUN mkdir -p /app
WORKDIR /app
COPY /package*.json ./
RUN npm install -g npm@10.6.0
RUN npm i
COPY . ./
EXPOSE  3001
CMD [ "node", "./app/app.js"]
