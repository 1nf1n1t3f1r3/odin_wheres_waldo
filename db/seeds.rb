# db/seeds.rb
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

beach_map = Map.create!(name: "Beach", image_url: "/images/waldo_beach.jpeg", slug: "beach")
troy_map = Map.create!(name: "Troy", image_url: "/images/waldo_troy.jpeg", slug: "troy")

# Characters for the Beach Map
beach_map.characters.create!(name: "Waldo", target_x: 65.0, target_y: 38.5)
beach_map.characters.create!(name: "Wenda", target_x: 80.5, target_y: 42.0)
beach_map.characters.create!(name: "Wizard", target_x: 30.0, target_y: 35.5)
beach_map.characters.create!(name: "Odlaw", target_x: 14.0, target_y: 35.5)
beach_map.characters.create!(name: "Woof", target_x: 71.0, target_y: 38.5)


# Characters for the Space Map
troy_map.characters.create!(name: "Waldo", target_x: 17.5, target_y: 86.0)
troy_map.characters.create!(name: "Wenda", target_x: 76.5, target_y: 77.5)
troy_map.characters.create!(name: "Wizard", target_x: 29.5, target_y: 14.5)
troy_map.characters.create!(name: "Odlaw", target_x: 87.0, target_y: 83.0)
troy_map.characters.create!(name: "Woof", target_x: 62.0, target_y: 71.5)

puts "--- SEED VERIFICATION LOGS ---"
puts "Beach Map saved with ID: #{beach_map.id}"
puts "Troy Map saved with ID: #{troy_map.id}"
puts "------------------------------"
