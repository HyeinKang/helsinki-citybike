FROM node:latest
RUN mkdir -p /usr/src/services
WORKDIR /usr/src/services
COPY package.json /usr/src/services/
RUN npm install
COPY . /usr/src/services
EXPOSE 3000
CMD [ "npm", "start" ]