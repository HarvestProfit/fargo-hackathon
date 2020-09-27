require 'test_helper'

class AddTest < ActiveSupport::TestCase
  test 'that you can create an add' do
    add = Add.create(name: 'some add', value: 100.00)
    assert add.present?
    add.destroy!
  end
end
