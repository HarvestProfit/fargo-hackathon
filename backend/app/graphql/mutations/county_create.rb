module Mutations
  class CountyCreate < Base::Mutation
    field :county, Types::CountyType, null: false

    argument :name, String, required: true
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a county'

    def resolve(name:, shape: nil)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      county = County.create(name: name, shape: boundary)
      {
        county: county.valid? ? county : nil,
        errors: county.errors.full_messages
      }
    end
  end
end
