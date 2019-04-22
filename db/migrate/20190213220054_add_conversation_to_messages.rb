class AddConversationToMessages < ActiveRecord::Migration[5.2]
  def change
	add_column :messages, :conversation_id, :string 
  end
end
