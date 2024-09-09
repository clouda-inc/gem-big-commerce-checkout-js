FROM node:19-alpine

WORKDIR /usr/app

COPY package-lock.json ./

COPY package.json ./

RUN npm install -g npm@9.0.0

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 8080

CMD ["npm", "run" ,"dev & " ,"npm", "run", "dev:server"]