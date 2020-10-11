FROM node:13 as appBuild
COPY ./app /app
WORKDIR /app

RUN yarn
RUN yarn build

FROM nginx:latest
COPY --from=appBuild /app/build /var/www/prod