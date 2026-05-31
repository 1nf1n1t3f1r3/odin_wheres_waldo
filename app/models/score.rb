# app/models/score.rb
class Score < ApplicationRecord
  belongs_to :map

  validates :player_name, presence: true
end
