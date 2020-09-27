module Mutations
  class AdditiveDestroy < Base::Mutation
    field :destroyed,
          Boolean,
          null: false,
          description: 'Was the record destroyed successfully'
    field :errors,
          [String],
          null: true,
          description: 'Errors incurred while destroying the county'

    argument :id, ID, required: true

    def resolve(id:)
      additive = GlobalID::Locator.locate(id, only: ::Add)
      raise ActiveRecord::RecordNotFound if additive.nil?
      destroyed = additive.destroy!
      {
        destroyed: destroyed,
        errors: additive.errors.full_messages
      }
    rescue ActiveRecord::RecordNotFound
      {
        destroyed: false,
        errors: ['Please provide a valid additive ID']
      }
    rescue ActiveRecord::RecordNotDestroyed => e
      {
        destroyed: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
