FROM node:lts AS build
RUN mkdir -p /app
WORKDIR /app
COPY /package*.json ./
RUN npm i
RUN npm install merge2
RUN npm install js-cookie
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "start"]

