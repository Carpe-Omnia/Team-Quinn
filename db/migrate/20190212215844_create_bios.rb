class CreateBios < ActiveRecord::Migration[5.2]
  def change
    create_table :bios do |t|
      t.string :user_id
      t.string :headline
      t.text :content
    end
  end
end
