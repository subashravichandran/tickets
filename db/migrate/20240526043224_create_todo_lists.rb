class CreateTodoLists < ActiveRecord::Migration[7.1]
  def change
    create_table :todo_lists do |t|
      t.string :name
      t.datetime :execute_at

      t.timestamps
    end
  end
end
