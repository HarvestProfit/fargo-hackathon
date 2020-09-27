module Mutations
  class AdditiveUpdate < Base::Mutation
    field :additive, Types::AddType, null: true
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while updating the additive'

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :value, Float, required: true
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a additive'

    def resolve(id:, name:, value:, shape: nil)
      additive = GlobalID::Locator.locate(id, only: ::Add)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      additive.update(name: name, value: value, shape: boundary)
      {
        additive: additive.valid? ? additive : nil,
        errors: additive.errors.full_messages
      }
    end
  end
end
