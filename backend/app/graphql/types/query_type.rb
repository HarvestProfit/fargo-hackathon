module Types
  class QueryType < Types::Base::Object
    field :additives,
          Types::AddType.connection_type,
          null: false,
          description: 'Additive values'
    field :counties,
          Types::CountyType.connection_type,
          null: false,
          description: 'Counties tracked in the application'
    field :feature_collection_value,
          GraphQL::Types::JSON,
          null: false,
          resolver: Resolvers::FeatureCollectionValue,
          description: 'Resolves a feature collection and gives values'
    field :subtractives,
          Types::AddType.connection_type,
          null: false,
          description: 'Subtractive values'

    def additives
      Add.all
    end

    def counties
      County.all
    end

    def subtractives
      Subtract.all
    end
  end
end
