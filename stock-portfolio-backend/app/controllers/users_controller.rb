class UsersController < ApplicationController
#add validation
  skip_before_action :authorized, only: [:create]

  def create
    #create user
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: {user: @user, jwt: @token }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  def show
    @user = User.find(show_params[:id])
    @portfolioList = Portfolio.where(user: @user).map { |e| [e.name, e.id] }.to_h
    # byebug
    render json: {username: @user.username, portfolios: @portfolioList}
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def show_params
    params.permit(:id)
  end
end
