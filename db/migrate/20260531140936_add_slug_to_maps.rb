class AddSlugToMaps < ActiveRecord::Migration[8.1]
  def change
    add_column :maps, :slug, :string
  end
end
