# app/controllers/api/v1/maps_controller.rb
class Api::V1::MapsController < ActionController::API
  def index
    render json: Map.all # [{id: 5, name: "Beach", image_url: "..."}, ...]
  end

  def show
    # Find the map match ignoring case (e.g., "beach" matches "Beach")
    map = Map.find_by!("LOWER(name) = ?", params[:id].downcase)
    render json: map.to_json(include: :characters)
  end
end
