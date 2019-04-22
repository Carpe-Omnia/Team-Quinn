class AddUserNameToObjects < ActiveRecord::Migration[5.2]
  def change
    add_column :jokes, :user_name, :string
	add_column :messages, :user_name, :string
	add_column :inboxes, :user_name, :string 
  end
end
