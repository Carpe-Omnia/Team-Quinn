class CreateSigns < ActiveRecord::Migration[5.2]
  def change
    create_table :signs do |t|
      t.string :address
      t.string :name
      t.string :delivery
      t.string :lng
      t.string :lat
    end
  end
end
