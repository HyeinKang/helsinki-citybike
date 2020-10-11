FROM node:latest
ENV NODE_ENV=${NODE_ENV}
COPY . /api
WORKDIR /api

RUN yarn
RUN yarn build

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "sh", "-c", "/wait && yarn ${NODE_ENV}" ]