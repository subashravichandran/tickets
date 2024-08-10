class HabitActivity < ApplicationRecord
  validates :activity_count, presence: true, numericality: true
end
