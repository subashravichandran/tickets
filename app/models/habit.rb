class Habit < ApplicationRecord
  validates :name, presence: true
  validates_numericality_of :streak
end
