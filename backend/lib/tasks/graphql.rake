require 'graphql/rake_task'

GraphQL::RakeTask.new(
  # rubocop:disable Style/Lambda
  load_schema: ->(_task) {
    require File.expand_path('../../config/environment', __dir__)
    BackendSchema
  }
  # rubocop:enable Style/Lambda
)
