class HabitActivity < ApplicationRecord
  belongs_to :habit

  validates :activity_count, presence: true, numericality: true
end
