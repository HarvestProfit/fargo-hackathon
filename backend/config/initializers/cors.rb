# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    # All asset requests should be to rails prefixed assets paths
    # served from the asset pipeline (e.g.: "/assets/*" by default)
    # https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
    resource '/graphql',
             headers: :any,
             methods: [:post],
             expose: ['page', 'total', 'per-page', 'etag']
  end
end
