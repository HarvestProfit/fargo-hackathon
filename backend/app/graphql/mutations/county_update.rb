module Mutations
  class CountyUpdate < Base::Mutation
    field :county, Types::CountyType, null: true
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while updating the county'

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a county'

    def resolve(id:, name:, shape: nil)
      county = GlobalID::Locator.locate(id, only: ::County)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      county.update(name: name, shape: boundary)
      {
        county: county.valid? ? county : nil,
        errors: county.errors.full_messages
      }
    end
  end
end
