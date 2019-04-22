class UsersController < ApplicationController
  def new
    name = params["name"]
    pword = params["pword"]
    email = params["email"]
    user = User.new(name: name, password: pword, email: email)
    if user.save
      bio = Bio.create(user_id: user.id, headline: "new user", content: "this user hasn't created a bio yet")
      inbox = Inbox.create(user_id: user.id, user_name: user.name)
      render json: {status: 'success',
      message: "loaded",
      data: {name: user.name, id: user.id, email: user.email}
      }, status: :ok
    else
      render json: {status: 'failure',
        message: "didn't work",
      data: "user not created"
    }, status: :ok
    end
  end
  def login
    user = User.find_by(email: params["email"])
    if user.authenticate(params["pword"])
      render json: {status: 'success',
      message: "logged in",
      data: {email: params["email"], name: user.name, id: user.id}
      }, status: :ok
    else
      render json: {status: 'success',
      message: "not logged in",
      data: "user not logged in"
      }, status: :ok
    end
  end
  def show
    user = User.find_by(name: params["name"])
    bio = user.bio
    if !!bio
      render json: {status: 'success',
        message: "user found",
        data: {
          name: user.name,
          bio: bio
        }
      }, status: :ok
    else
      render json: {status: 'success',
        message: "user not found",
        data: {
          bio: {
            user_id: nil,
            headline: "user not found",
            content: ""
          }
        }
      }, status: :ok
    end
  end
  def update
    user = User.find_by(id: params["id"])
    bio = user.bio
    if bio.update(headline: params["headline"], content: params["content"])
      render json: {status: 'success',
        message: "bio updated",
        data: {
          bio: bio
        }
      }, status: :ok
    else
      render json: {status: 'success',
        message: "didn't work",
        data: {
          bio: bio
        }
      }, status: :ok
    end
  end
  def facebookAuth
    if !User.find_by(email: params["email"])
      user = User.new(email: params["email"], name: params[:name], password: rand(36**12).to_s(36) )
      user.save
    else
      user = User.find_by(email: params["email"])
    end
    bio = Bio.find_or_create_by(user_id: user.id)
    if bio.headline == nil && bio.content == nil
      bio.update(headline: "new user", content: "this user hasn't created a bio yet")
    end
    inbox = Inbox.find_or_create_by(user_id: user.id, user_name: user.name)
    if user.save!
      render json: {status: 'success',
      message: "logged in",
      data: {email: params["email"], name: user.name, id: user.id}
      }, status: :ok
    else
      render json: {status: 'success',
      message: "not logged in",
      data: "user not logged in"
      }, status: :ok
    end
  end

  def googleAuth
  end

end
