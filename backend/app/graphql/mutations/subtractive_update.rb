module Mutations
  class SubtractiveUpdate < Base::Mutation
    field :subtractive, Types::AddType, null: true
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while updating the subtractive'

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :value, Float, required: true
    argument :shape,
             GraphQL::Types::JSON,
             required: false,
             description: 'The geography for a subtractive'

    def resolve(id:, name:, value:, shape: nil)
      subtractive = GlobalID::Locator.locate(id, only: ::Add)
      boundary = RGeo::GeoJSON.decode(shape) unless shape.nil?
      subtractive.update(name: name, value: value, shape: boundary)
      {
        subtractive: subtractive.valid? ? subtractive : nil,
        errors: subtractive.errors.full_messages
      }
    end
  end
end
