module Types
  class QueryType < Types::Base::Object
    field :counties,
          Types::CountyType.connection_type,
          null: false,
          description: 'Counties tracked in the application'

    def counties
      County.all
    end
  end
end
