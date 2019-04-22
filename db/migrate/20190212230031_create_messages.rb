class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
	  t.string :subject 
      t.text :content
      t.string :from_id
      t.string :to_id
	  
	  t.timestamps 
    end
  end
end
