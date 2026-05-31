# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :maps, only: [ :index, :show ] # Allows GET /api/v1/maps
      resources :scores, only: [ :index, :create ]
      post "characters/validate_click", to: "characters#validate_click"
      post "games/start", to: "games#start"
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
end
