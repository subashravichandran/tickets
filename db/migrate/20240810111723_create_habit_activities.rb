class CreateHabitActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :habit_activities do |t|
      t.integer :activity_count

      t.timestamps
    end
  end
end
