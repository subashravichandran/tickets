class Habit < ApplicationRecord
  has_many :habit_activities

  validates :name, presence: true
  validates_numericality_of :streak
end
