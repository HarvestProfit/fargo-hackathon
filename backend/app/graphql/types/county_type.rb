module Types
  class CountyType < Types::Base::Object
    field :id, ID, null: false
    field :name, String, null: true
    field :shape, GraphQL::Types::JSON, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def shape
      boundary = RGeo::GeoJSON.encode(object.shape)
      {
        type: 'feature',
        properties: {
          id: object.id,
          name: object.name
        },
        geometry: boundary
      }
    end
  end
end
