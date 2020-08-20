FROM node:latest
WORKDIR /services
COPY package.json ./
RUN npm install
COPY ./ .
CMD [ "npm", "start" ]