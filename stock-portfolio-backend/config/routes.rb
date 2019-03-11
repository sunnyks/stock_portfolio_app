Rails.application.routes.draw do
  resources :transactions, only: [:create, :index]
  resources :portfolios, only: [:create, :edit, :delete, :show]
  resources :users, only: [:create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
