FROM node:13

COPY . /app
WORKDIR /app

RUN npm install
RUN npm rebuild node-sass

CMD [ "npm", "run", "dev" ]