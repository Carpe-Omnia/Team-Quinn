class Conversation < ApplicationRecord
	has_many :messages, :foreign_key => 'conversation_id'
	#has_many :conversation_inboxes, :foreign_key => 'conversation_id'
	has_and_belongs_to_many :inboxes 
	
	def self.find_by_users(user1, user2) 
		thing = self.all.find { |convo| convo.inboxes == [user1.inbox, user2.inbox] || convo.inboxes == [user2.inbox, user1.inbox] }	
		if !!thing 
			thing 
		else
			thing = self.new 
			thing.inboxes << user1.inbox
			thing.inboxes << user2.inbox 
			thing.save
			thing 
		end		
	end 
	
end 
