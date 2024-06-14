class CreateCountMeasures < ActiveRecord::Migration[7.1]
  def change
    create_table :count_measures do |t|
      t.string :name
      t.string :abbreviation, limit: 5

      t.timestamps
    end
  end
end
