class JokeComment < ApplicationRecord 
	belongs_to :user, :foreign_key => 'user_id' 
	belongs_to :joke, :foreign_key => 'joke_id' 
end 