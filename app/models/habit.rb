class Habit < ApplicationRecord
  has_many :habit_activities

  validates :name, presence: true
  validates_numericality_of :streak

  def is_streak_maintained?
    return true unless (previous_activity_created_at = habit_activities.order(created_at: :asc).pluck(:created_at).last).present?

    previous_activity_created_at.to_date == Date.yesterday
  end
end
