module Types
  class SubtractType < Types::Base::Object
    global_id_field :id
    field :name, String, null: true
    field :shape, GraphQL::Types::JSON, null: true
    field :value, Float, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def shape
      boundary = RGeo::GeoJSON.encode(object.shape)
      {
        type: 'feature',
        properties: {
          id: object.id,
          name: object.name,
          value: object.value.to_f
        },
        geometry: boundary
      }
    end
  end
end
