class Joke < ActiveRecord::Base 
	belongs_to :author, :class_name => 'User', :foreign_key => 'author_id' 
	has_many :joke_comments, :class_name => 'JokeComment' , :foreign_key => 'joke_id' 
end 
