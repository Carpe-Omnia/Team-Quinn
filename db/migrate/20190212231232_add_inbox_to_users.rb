class AddInboxToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :inbox_id, :string
  end
end
