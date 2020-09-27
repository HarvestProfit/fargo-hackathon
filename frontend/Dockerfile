FROM node:lts-alpine as build

WORKDIR /frontend

COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install
COPY frontend/ ./
RUN yarn build
RUN yarn global add serve
CMD serve -s build
