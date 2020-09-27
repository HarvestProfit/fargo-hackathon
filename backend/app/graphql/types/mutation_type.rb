module Types
  class MutationType < Types::Base::Object
    field :additive_create, mutation: Mutations::AdditiveCreate
    field :additive_destroy, mutation: Mutations::AdditiveDestroy
    field :additive_update, mutation: Mutations::AdditiveUpdate
    field :county_create, mutation: Mutations::CountyCreate
    field :county_destroy, mutation: Mutations::CountyDestroy
    field :county_update, mutation: Mutations::CountyUpdate
    field :subtractive_create, mutation: Mutations::SubtractiveCreate
    field :subtractive_destroy, mutation: Mutations::SubtractiveDestroy
    field :subtractive_update, mutation: Mutations::SubtractiveUpdate
  end
end
