class CreateSubtracts < ActiveRecord::Migration[6.0]
  def change
    create_table :subtracts do |t|
      t.string :name
      t.geometry :shape, geographic: true
      t.decimal :value, default: 0.00

      t.timestamps
    end
  end
end
