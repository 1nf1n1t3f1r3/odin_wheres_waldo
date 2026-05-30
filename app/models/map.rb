# app/models/map.rb
class Map < ApplicationRecord
  has_many :characters, dependent: :destroy
  has_many :scores, dependent: :destroy
end
