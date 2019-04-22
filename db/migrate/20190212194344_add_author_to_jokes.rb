class AddAuthorToJokes < ActiveRecord::Migration[5.2]
  def change
    add_column :jokes, :author_id, :string
  end
end
