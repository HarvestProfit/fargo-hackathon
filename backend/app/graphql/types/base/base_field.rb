module Types
  module Base
    class Field < GraphQL::Schema::Field
      argument_class Types::BaseArgument
    end
  end
end
