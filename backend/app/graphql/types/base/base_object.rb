module Types
  module Base
    class Object < GraphQL::Schema::Object
      field_class Types::BaseField
    end
  end
end
