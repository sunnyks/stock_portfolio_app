class TransactionsController < ApplicationController

  #create
  #check to make sure transaction is legit if its a sell given user and specific portfolio

  #refactor to use strong params

  #get date in there

  # include note functionality?? crud

  def create
    @user = User.find(params[:user])
    @portfolio = Portfolio.find_by(user: @user, name: params[:portfolio])
    # have a redundant column in my table whoops
    quantity = params[:quantity].to_i
    transtype = params[:type]
    if transtype == "buy"
      @transaction = Transaction.new(user: @user, portfolio: @porfolio, symbol: params[:symbol], transtype: params[:type], quantity: quantity, price: params[:price])
    elsif transtype == "sell" && true
      # implement check to make sure given portfolio containts quantity of stock to sell
      @transaction = Transaction.new(user: @user, portfolio: @porfolio, symbol: params[:symbol], transtype: params[:type], quantity: -quantity, price: params[:price])
    end
    @transaction.portfolio = @portfolio
    if @transaction.save
      render json: {portfolios: @user.getPortfolios}, status: :created
    else
      render json: @transaction.errors
    end
  end

  private
  def transaction_params
    params.require(:transaction).permit()
  end
end
