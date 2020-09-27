module Types
  module Base
    module Interface
      include GraphQL::Schema::Interface

      field_class Types::BaseField
    end
  end
end
