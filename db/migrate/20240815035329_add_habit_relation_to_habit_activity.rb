class AddHabitRelationToHabitActivity < ActiveRecord::Migration[7.1]
  def change
    add_reference :habit_activities, :habit, null: false, foreign_key: true
  end
end
