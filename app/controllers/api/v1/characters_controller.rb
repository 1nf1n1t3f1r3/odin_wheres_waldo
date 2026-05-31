# app/controllers/api/v1/characters_controller.rb
class Api::V1::CharactersController < ActionController::API
  def validate_click
    click_x = params[:x].to_f
    click_y = params[:y].to_f
    tolerance = 3 # 🎯 3% radius circle

    puts "======= DEBUGGING WALDO CLICK ======="
    puts "User clicked at: X: #{click_x}%, Y: #{click_y}%"

    if session[:start_time]
      # Subtract the saved session time from the exact microsecond of this click
      elapsed = Time.current - Time.zone.parse(session[:start_time].to_s)

      puts "\n🕵️‍♂️ ======= CLOCK DRIFT CHECK ======="
      puts "Current Click Time: #{Time.current}"
      puts "Seconds passed since map load: #{elapsed.round(2)} seconds"
      puts "===================================\n\n"
    else
      puts "\n🚨 WARNING: No start_time found in session memory!\n\n"
    end

    # 🗺️ Scope the query to only check characters belonging to the active map!
    current_map = Map.find_by!(slug: params[:map_id])

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
      # Initialize tracking array if it doesn't exist
      session[:found_character_ids] ||= []

      # Log this character's ID so they can't double-count them
      unless session[:found_character_ids].include?(found_character.id)
        session[:found_character_ids] << found_character.id
      end

      # 🏁 SECURITY CHECK: Has the user found ALL characters belonging to this map?
      total_map_characters = current_map.characters.pluck(:id)
      is_game_over = (total_map_characters - session[:found_character_ids]).empty?

      total_time = nil
      if is_game_over && session[:start_time]
        # ⏱️ SECURE TIME CALCULATION: Backend End Time minus Backend Start Time
        total_time = (Time.current - Time.zone.parse(session[:start_time].to_s)).round(2)
        session[:secure_score] = total_time # Seal it in the vault for the high-score submission
      end

      render json: {
        found: true,
        id: found_character.name.downcase,
        name: found_character.name,
        game_completed: is_game_over,
        secure_score: total_time
      }
    else
      render json: { found: false }
    end
  end
end
