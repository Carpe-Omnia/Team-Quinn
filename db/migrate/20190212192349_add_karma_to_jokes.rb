class AddKarmaToJokes < ActiveRecord::Migration[5.2]
  def change
    add_column :jokes, :karma, :integer
  end
end
