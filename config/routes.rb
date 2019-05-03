Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  post '/api/users/new/:name/:pword/:email', to: 'users#new'
  post '/api/users/login/:name/:pword', to: 'users#login'
  post '/api/users/update/:id/:headline/:content', to: 'users#update'
  get '/api/users/show/:name', to: 'users#show'
  constraints(email: /[^\/]+/) do
    post '/api/users/auth/facebook/:name/:email', to: 'users#facebookAuth'
    post '/api/users/auth/google/:name/:email', to: 'users#facebookAuth'
  end

  get '/api/signs', to: 'signs#index'
  constraints(lat: /[^\/]+/, lng: /[^\/]+/) do
    post '/api/signs', to: 'signs#create'
  end
  post 'api/signs/update', to: 'signs#update'
  post 'api/signs/delete/:id', to: 'signs#delete'
  
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end


end
