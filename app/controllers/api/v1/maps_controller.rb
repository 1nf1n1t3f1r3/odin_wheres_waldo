# app/controllers/api/v1/maps_controller.rb
class Api::V1::MapsController < ActionController::API
  def index
    render json: Map.all # [{id: 5, name: "Beach", image_url: "..."}, ...]
  end

  def show
    map = Map.find_by!(slug: params[:id])

    # ⏱️ Start the stopwatch automatically when the stage assets load!
    session[:start_time] = Time.current
    session[:found_character_ids] = []

    # 🖨️ Terminal printout so you can verify it's working instantly
    puts "\n⏱️ ======= SECURE GAME STARTED ======="
    puts "Map: #{map.name}"
    puts "Start Time Saved in Session: #{session[:start_time]}"
    puts "=====================================\n\n"

    render json: map.to_json(include: :characters)
    end
end
