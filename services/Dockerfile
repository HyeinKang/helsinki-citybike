FROM node:latest
WORKDIR /services
COPY package.json ./
RUN npm install
COPY ./ .
CMD "NODE_ENV=${NODE_ENV} npm start"