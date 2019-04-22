class CreateJokeComments < ActiveRecord::Migration[5.2]
  def change
    create_table :joke_comments do |t|
	  t.string :user_name 
      t.string :user_id
      t.integer :karma
      t.text :content
	  t.string :joke_id 
	  
      t.timestamps 
    end
  end
end
