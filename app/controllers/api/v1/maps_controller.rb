# app/controllers/api/v1/maps_controller.rb
class Api::V1::MapsController < ActionController::API
  def index
    render json: Map.all # [{id: 5, name: "Beach", image_url: "..."}, ...]
  end

  def show
    map = Map.find(params[:id])
    render json: map.to_json(include: :characters)
  end
end
