class CreateJoinTableConversationsInboxes < ActiveRecord::Migration[5.2]
  def change
    create_join_table :conversations, :inboxes do |t|
      # t.index [:conversation_id, :inbox_id]
      # t.index [:inbox_id, :conversation_id]
    end
  end
end
