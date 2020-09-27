FROM ruby:2.7-alpine
RUN bundle config --global frozen 1
RUN apk update && apk add build-base tzdata postgresql-dev postgresql-client libxslt-dev libxml2-dev geos-dev
WORKDIR /backend
COPY backend/Gemfile ./
COPY backend/Gemfile.lock ./
RUN bundle install --without development test
COPY backend/ ./

# Start the main process.
CMD bundle exec rails server
