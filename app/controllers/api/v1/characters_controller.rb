# app/controllers/api/v1/characters_controller.rb
class Api::V1::CharactersController < ActionController::API
  def validate_click
    click_x = params[:x].to_f
    click_y = params[:y].to_f
    tolerance = 3.0 # 🎯 3% radius circle

    puts "======= DEBUGGING WALDO CLICK ======="
    puts "User clicked at: X: #{click_x}%, Y: #{click_y}%"

    # 🗺️ Scope the query to only check characters belonging to the active map!
    current_map = Map.find(params[:map_id])
    # Temporary quick-fix in app/controllers/api/v1/characters_controller.rb
    # current_map = Map.find_by(name: "Beach") # Looks it up by name instead of params[:map_id]

    # 🔍 Scan all characters in the DB to see if any match the coordinates
    found_character = current_map.characters.find do |char|
      dist_x = click_x - char.target_x
      dist_y = click_y - char.target_y
      distance = Math.sqrt((dist_x ** 2) + (dist_y ** 2))

      # 🖨️ Print out what Rails is seeing for every character in your DB!
      puts "Checking #{char.name}: DB_X: #{char.target_x}, DB_Y: #{char.target_y}"
      puts "Calculated Distance: #{distance} (Needs to be <= #{tolerance})"

      distance <= tolerance
    end

    if found_character
      # Return the downcased name to perfectly match your frontend IDs ("waldo", "wenda")
      render json: { found: true, id: found_character.name.downcase, name: found_character.name }
    else
      render json: { found: false }
    end
  end
end
