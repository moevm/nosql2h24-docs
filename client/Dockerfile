FROM node:18.18.2-alpine3.18

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

ENV VUE_APP_BASE_URL=http://localhost:5000/api

EXPOSE 8080

CMD ["npm", "run", "serve"]