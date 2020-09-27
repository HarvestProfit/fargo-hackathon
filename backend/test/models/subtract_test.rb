require 'test_helper'

class SubtractTest < ActiveSupport::TestCase
  test 'that you can create a subtract' do
    subtract = Subtract.create(name: 'some subtract', value: 100.00)
    assert subtract.present?
    subtract.destroy!
  end
end
