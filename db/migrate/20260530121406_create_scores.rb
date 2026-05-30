class CreateScores < ActiveRecord::Migration[8.1]
  def change
    create_table :scores do |t|
      t.string :player_name
      t.float :total_time

      t.timestamps
    end
  end
end
