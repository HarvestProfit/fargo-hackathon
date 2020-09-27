module Types
  class MutationType < Types::Base::Object
    field :county_create, mutation: Mutations::CountyCreate
    field :test_field,
          String,
          null: false,
          description: 'An example field added by the generator'

    def test_field
      'Hello World'
    end
  end
end
