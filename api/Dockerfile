FROM node:latest
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "sh", "-c", "npm run ${NODE_ENV}" ]