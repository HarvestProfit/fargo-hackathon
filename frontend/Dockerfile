FROM node:lts-alpine as build

WORKDIR /app

COPY app/package.json ./
COPY app/yarn.lock ./
RUN yarn install
COPY app/ ./
RUN yarn build
RUN yarn global add serve
EXPOSE 3000
CMD serve -s build -l 3000
