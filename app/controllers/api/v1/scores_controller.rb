# app/controllers/api/v1/scores_controller.rb
class Api::V1::ScoresController < ActionController::API
  # GET /api/v1/scores?map_id=5
  def index
    # 🟢 Look up by slug to match what React sends
    current_map = Map.find_by!(slug: params[:map_id])

    scores = Score.where(map_id: current_map.id).order(total_time: :asc).limit(10)
    render json: scores
  end

  def create
    # 🛑 GUARD RAIL: Did they actually finish the game honestly?
    if session[:secure_score].nil?
      return render json: { error: "Nice try, cheater! Play the game properly." }, status: :unauthorized
    end

    current_map = Map.find_by!(slug: params[:map_id])

    # Save the score using the time calculated in step 3!
    score = map.scores.create!(
      player_name: params[:player_name].upcase,
      total_time: session[:secure_score]
    )

    # Wipe the session slate clean for the next game run
    session[:secure_score] = nil
    session[:start_time] = nil
    session[:found_character_ids] = []

    render json: { success: true, score: score }
  end
end
