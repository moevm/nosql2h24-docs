FROM node:18.18.2-alpine3.18

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

ENV TOKEN_KEY=RTvdoc198s7ByIXnbpjx4LVXylm5B7x

COPY . .

EXPOSE 5000

CMD ["npm", "start"]