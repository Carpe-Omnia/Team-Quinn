class User < ApplicationRecord
	has_secure_password

	has_many :jokes, :foreign_key => 'author_id'
	has_many :messages, :foreign_key => 'from_id'
	has_many :joke_comments, :class_name => 'JokeComment', :foreign_key => 'user_id'

	has_one :bio, :foreign_key => 'user_id'
	has_one :inbox, :foreign_key => 'user_id'

	#validates :name, uniqueness: true
	validates :email, uniqueness: true
end
