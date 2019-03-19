class TransactionsController < ApplicationController

  #create
  #check to make sure transaction is legit if its a sell given user and specific portfolio

  #refactor to use strong params

  #get date in there

  # include note functionality?? crud

  def create
    @user = User.find(params[:user])
    @portfolio = Portfolio.find_by(user: @user, name: params[:portfolio])
    # byebug
    @transaction = Transaction.new(user: @user, portfolio: @porfolio, symbol: params[:symbol], transtype: params[:type], quantity: params[:quantity], price: params[:price])
    @transaction.portfolio = @portfolio
    if @transaction.save
      render json: {user: @user}, status: :created
    else
      render json: @transaction.errors
    end
  end

  private
  def transaction_params
    params.require(:transaction).permit()
  end
end
