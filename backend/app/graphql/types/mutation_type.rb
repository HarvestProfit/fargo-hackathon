module Types
  class MutationType < Types::Base::Object
    field :county_create, mutation: Mutations::CountyCreate
    field :county_destroy, mutation: Mutations::CountyDestroy
    field :county_update, mutation: Mutations::CountyUpdate
  end
end
