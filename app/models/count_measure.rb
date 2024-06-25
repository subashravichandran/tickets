class CountMeasure < ApplicationRecord
  validates :name, presence: true
  validates :abbreviation, length: { in: 1..3}
end
