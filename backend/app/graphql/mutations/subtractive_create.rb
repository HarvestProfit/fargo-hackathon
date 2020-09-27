module Mutations
  class SubtractiveCreate < Base::Mutation
    field :subtractive, Types::CountyType, null: true
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while creating the county'

    argument :name, String, required: true
    argument :value, Float, required: true
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a subtractive'

    def resolve(name:, value:, shape: nil)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      subtractive = Add.create(name: name, value: value, shape: boundary)
      {
        subtractive: subtractive.valid? ? subtractive : nil,
        errors: subtractive.errors.full_messages
      }
    end
  end
end
