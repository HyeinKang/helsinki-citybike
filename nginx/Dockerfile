FROM node:13 as appBuild
COPY ./app /app
WORKDIR /app

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

FROM nginx:latest
COPY --from=appBuild /app/build /var/www/prod