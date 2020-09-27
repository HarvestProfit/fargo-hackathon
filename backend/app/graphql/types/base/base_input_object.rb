module Types
  module Base
    class InputObject < GraphQL::Schema::InputObject
      argument_class Types::BaseArgument
    end
  end
end
