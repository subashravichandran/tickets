class HabitActivity < ApplicationRecord
  belongs_to :habit

  validates :activity_count, presence: true, numericality: true

  before_create :update_streak

  private

  def  update_streak
    if habit.is_streak_maintained?
      Habit.increment_counter(:streak, habit.id)
    elsif habit.streak.positive?
      Habit.update_counters(habit.id, streak: 0 - (habit.streak - 1))
    end
  end
end
