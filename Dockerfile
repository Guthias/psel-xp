FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN ["npm", "install"]

CMD ["node", "build/server.js"]
