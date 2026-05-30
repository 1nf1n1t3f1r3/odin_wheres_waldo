class AddMapToScores < ActiveRecord::Migration[8.1]
  def change
    add_reference :scores, :map, null: false, foreign_key: true
  end
end
