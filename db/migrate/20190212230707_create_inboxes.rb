class CreateInboxes < ActiveRecord::Migration[5.2]
  def change
    create_table :inboxes do |t|
      t.string :user_id
	  
	  t.timestamps 
    end
  end
end
