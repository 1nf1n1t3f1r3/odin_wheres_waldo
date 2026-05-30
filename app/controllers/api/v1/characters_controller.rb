# app/controllers/api/v1/characters_controller.rb
class Api::V1::CharactersController < ApplicationController
  def validate_click
    char = Character.find_by(map_id: params[:map_id], name: params[:name])

    # Extract coordinates sent by React
    click_x = params[:x].to_f
    click_y = params[:y].to_f

    # Reuse your Pythagorean distance math in Ruby
    # Using an absolute percentage tolerance (e.g., 3%) instead of pixel radiuses
    tolerance = 3.0
    dist_x = click_x - char.target_x
    dist_y = click_y - char.target_y
    distance = Math.sqrt((dist_x ** 2) + (dist_y ** 2))

    if distance <= tolerance
      render json: { found: true, character: char }
    else
      render json: { found: false }
    end
  end
end
