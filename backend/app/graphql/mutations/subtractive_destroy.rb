module Mutations
  class SubtractiveDestroy < Base::Mutation
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
      subtractive = GlobalID::Locator.locate(id, only: ::Add)
      raise ActiveRecord::RecordNotFound if subtractive.nil?
      destroyed = subtractive.destroy!
      {
        destroyed: destroyed,
        errors: subtractive.errors.full_messages
      }
    rescue ActiveRecord::RecordNotFound
      {
        destroyed: false,
        errors: ['Please provide a valid subtractive ID']
      }
    rescue ActiveRecord::RecordNotDestroyed => e
      {
        destroyed: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
