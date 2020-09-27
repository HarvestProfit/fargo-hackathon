module Mutations
  class CountyDestroy < Base::Mutation
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
      county = GlobalID::Locator.locate(id, only: ::County)
      raise ActiveRecord::RecordNotFound if county.nil?
      destroyed = county.destroy!
      {
        destroyed: destroyed,
        errors: county.errors.full_messages
      }
    rescue ActiveRecord::RecordNotFound
      {
        destroyed: false,
        errors: ['Please provide a valid county ID']
      }
    rescue ActiveRecord::RecordNotDestroyed => e
      {
        destroyed: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
