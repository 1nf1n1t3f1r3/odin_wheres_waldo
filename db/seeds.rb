# db/s
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Map.destroy_all # Keeps things clean if you run the script multiple times

beach_map = Map.create!(name: "Beach", image_url: "/images/waldo_beach.jpeg")
space_map = Map.create!(name: "Space", image_url: "/images/waldo_troy.jpeg")

# Characters for the Beach Map
beach_map.characters.create!(name: "Waldo", target_x: 65.0, target_y: 38.5)
beach_map.characters.create!(name: "Wenda", target_x: 80.5, target_y: 42.0)
beach_map.characters.create!(name: "Wizard", target_x: 30.0, target_y: 35.5)
beach_map.characters.create!(name: "Odlaw", target_x: 14.0, target_y: 35.5)
beach_map.characters.create!(name: "Woof", target_x: 71.0, target_y: 38.5)


# Characters for the Space Map
space_map.characters.create!(name: "Waldo", target_x: 12.5, target_y: 88.3)
space_map.characters.create!(name: "Wenda", target_x: 5.0, target_y: 41.2)
space_map.characters.create!(name: "Wizard", target_x: 45.2, target_y: 23.1)
space_map.characters.create!(name: "Odlaw", target_x: 77.0, target_y: 23.0)
space_map.characters.create!(name: "Woof", target_x: 77.0, target_y: 23.0)
