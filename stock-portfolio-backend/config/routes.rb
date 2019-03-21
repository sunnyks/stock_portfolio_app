Rails.application.routes.draw do
  resources :transactions, only: [:create, :index]
  resources :portfolios, only: [:create, :edit, :delete, :show, :index]
  resources :users, only: [:create, :show]

  post '/login', to: 'auth#create'

  # lole
  post '/logout', to: 'auth#delete'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
