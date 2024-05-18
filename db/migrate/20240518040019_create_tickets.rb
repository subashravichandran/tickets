class CreateTickets < ActiveRecord::Migration[7.1]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :description
      t.integer :creator_id
      t.integer :priority_id

      t.timestamps
    end
  end
end
