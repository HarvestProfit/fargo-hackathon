require 'test_helper'

class CountyTest < ActiveSupport::TestCase
  test 'that you can create a county' do
    county = County.create(name: 'Bob county')
    assert county.present?
    county.destroy!
  end
end
