# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "characters/validate_click", to: "characters#validate_click"
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
end
