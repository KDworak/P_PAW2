FROM node:lts AS build
RUN mkdir -p /app
WORKDIR /app
COPY /package*.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "start"]

