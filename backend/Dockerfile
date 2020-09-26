FROM ruby:2.7-alpine
RUN bundle config --global frozen 1
RUN apk update && apk add build-base postgresql-dev geos-dev
WORKDIR /backend
COPY backend/Gemfile ./
COPY backend/Gemfile.lock ./
RUN bundle install --without development test
COPY backend/ ./

EXPOSE 3001

# Start the main process.
CMD bundle exec puma -C config/puma.rb
