FROM ruby:2.7-alpine
RUN bundle config --global frozen 1
RUN apk update && apk add build-base postgresql-client geos
WORKDIR /backend
COPY backend/Gemfile ./
COPY backend/Gemfile.lock ./
RUN bundle install
COPY backend/ ./

# Add a script to be executed every time the container starts.
COPY backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Start the main process.
CMD bundle exec puma -c config/puma.rb
