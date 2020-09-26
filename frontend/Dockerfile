FROM node:lts-alpine as build

WORKDIR /frontend

COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install
COPY frontend/ ./
RUN yarn build
RUN yarn global add serve
EXPOSE 3000
CMD serve -s build -l 3000
