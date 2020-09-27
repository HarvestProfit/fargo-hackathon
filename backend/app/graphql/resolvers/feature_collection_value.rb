module Resolvers
  class FeatureCollectionValue < Resolvers::Base
    type GraphQL::Types::JSON, null: false

    argument :feature_collection, GraphQL::Types::JSON, required: true

    def resolve(feature_collection:)
      collection = RGeo::GeoJSON.decode(feature_collection)
      min, max = get_min_and_max(collection)
      new_features = new_features_with_values(collection, min, max)
      new_collection = RGeo::GeoJSON::FeatureCollection.new(new_features)
      RGeo::GeoJSON.encode(new_collection)
    end

    def get_min_and_max(feature_collection)
      max = 0.00
      min = 0.00
      feature_collection.each do |feature|
        value = get_value_for_shape(feature.geometry)
        max = value if max < value
        min = value if min > value
      end
      [min, max]
    end

    def new_features_with_values(feature_collection, min, max)
      features = []
      feature_collection.each do |original_feature|
        value = get_value_for_shape(original_feature.geometry)
        color = figure_out_color(value, min, max)
        feature = RGeo::GeoJSON::Feature.new(
          original_feature.geometry,
          nil,
          { value: value.to_f, fill: "hsl(#{color}, 75%, 50%)" }
        )
        features << feature
      end
      features
    end

    def get_value_for_shape(geometry)
      adds = Add.where('st_intersects(?, adds.shape)', geometry)
      subtracts = Subtract.where('st_intersects(?, subtracts.shape)', geometry)
      add = adds.average(:value)
      subtract = subtracts.average(:value)
      add ||= 0
      subtract ||= 0
      add - subtract
    end

    def figure_out_color(value, min, max)
      total_range = max - min
      relative_value = value - min

      ratio = total_range.positive? ? relative_value / total_range : 0
      total_range.positive? ? ratio * 120 : 60
    end
  end
end
