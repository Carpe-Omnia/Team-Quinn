class Message < ApplicationRecord 
	belongs_to :sender, :class_name => 'User', :foreign_key => 'from_id'
	has_one :inbox 
	has_one :conversation, :foreign_key => 'conversation_id'
end 
