FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

EXPOSE 5000

CMD ["/bin/bash", "-c", "/wait-for-it.sh -- node server.js"]