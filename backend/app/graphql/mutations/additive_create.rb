module Mutations
  class AdditiveCreate < Base::Mutation
    field :additive, Types::AddType, null: true
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while creating the additive'

    argument :name, String, required: true
    argument :value, Float, required: true
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a additive'

    def resolve(name:, value:, shape: nil)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      additive = Add.create(name: name, value: value, shape: boundary)
      {
        additive: additive.valid? ? additive : nil,
        errors: additive.errors.full_messages
      }
    end
  end
end
