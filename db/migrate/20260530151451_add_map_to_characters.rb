class AddMapToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_reference :characters, :map, null: false, foreign_key: true
  end
end
