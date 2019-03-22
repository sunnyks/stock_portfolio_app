class PortfoliosController < ApplicationController

  def create
    # byebug
    @user = User.find(params[:user])
    @portfolio = Portfolio.new(user: @user, name: params[:portfolioName])
    if @portfolio.save
      @portfolioList = Portfolio.where(user: @user).map { |e| [e.name, e.id] }.to_h
      # render the portfolio list as an object with keys and values being names and IDs
      render json: {user: @user, portfolios: @portfolioList }, status: :created
    else
      render json: { error: 'failed to create portfolio' }, status: :not_acceptable
    end
  end

  def index
  end

  def delete
  end

  def show
  end

  private
  def portfolio_params
    params.require(:portfolio).permit(:portfolioName, :user)
  end
end
