class CreateMaps < ActiveRecord::Migration[8.1]
  def change
    create_table :maps do |t|
      t.string :name
      t.string :image_url

      t.timestamps
    end
  end
end
