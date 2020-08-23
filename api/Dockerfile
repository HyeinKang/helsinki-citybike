FROM node:latest
WORKDIR /api
COPY package.json ./
RUN npm install
COPY ./ .
CMD "NODE_ENV=${NODE_ENV} npm start"