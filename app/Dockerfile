FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 4000
RUN [ "sh", "-c", "npm run ${NODE_ENV}" ]