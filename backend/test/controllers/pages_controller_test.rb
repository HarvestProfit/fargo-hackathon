require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test 'should get the home page redirect' do
    get root_url
    assert_redirected_to ENV.fetch('FRONTEND_URL', 'http://localhost:3000')
  end
end
