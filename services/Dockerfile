FROM node:latest
ENV NODE_ENV=${NODE_ENV}
COPY . /services
WORKDIR /services
RUN npm install

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD [ "sh", "-c", "/wait && npm run ${NODE_ENV}" ]