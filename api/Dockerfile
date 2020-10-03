FROM node:latest
ENV NODE_ENV=${NODE_ENV}
COPY . /api
WORKDIR /api

RUN npm install
RUN npm run build

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "sh", "-c", "/wait && npm run ${NODE_ENV}" ]