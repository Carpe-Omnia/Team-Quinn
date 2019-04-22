class MessagesController < ApplicationController
  def index
    user = User.find_by(id: params["id"])
    inbox = user.inbox ;
    convos = inbox.conversations ;
    puts convos
    datapackage = []
    convos.each do |convo|
      relbox = convo.inboxes.select do |box|
        box != inbox
      end
      mess = {
        id: convo.id,
        messages: convo.messages,
        inbox: relbox
      }
      datapackage << mess
    end
    puts datapackage
    if !!inbox
      render json: {
        status: "success",
        message: "inbox found",
        data: {datapackage: datapackage}
      }, status: :ok
    else
      render json: {
        status: "success",
        message: "inbox found",
        data: "conversations not found"
      }, status: :ok
    end
  end
  def create
    user = User.find_by(id: params["user_id"])
    conversation = Conversation.find_by(id: params["conversation_id"])
    mess = Message.new(
      from_id: user.id,
      conversation_id: conversation.id,
      to_id: params["to_id"], user_name: user.name,
      subject: params["subject"], content: params["content"]
    )
    if mess.save
      render json: {
        status: "success",
        message: "message created",
        data: mess
      }, status: :ok
    else
      render json: {
        status: "success",
        message: "message not created",
        data: params
      }, status: :ok
    end
  end
  def new
    user = User.find_by(id: params["user_id"])
    recipient = User.find_by(name: params["recipient_name"])
    content = params["content"]
    subject = params["subject"]
    if !!user && !!recipient && content && subject
      convo = Conversation.find_by_users(user, recipient)
      message = Message.new(
        from_id: user.id,
        to_id: recipient.id,
        content: content,
        subject: subject,
        conversation_id: convo.id
      )
      if message.save
        render json: {
          status: "success",
          message: "message created",
          data: message
        }, status: :ok
      end
    else
      render json: {
        status: "success",
        message: "message not created",
        data: "no dice kid"
      }, status: :ok
    end
  end
end
