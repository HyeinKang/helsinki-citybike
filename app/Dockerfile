FROM node:latest
COPY ./ ./app
WORKDIR /app
RUN npm install
EXPOSE 4000
RUN npm run build