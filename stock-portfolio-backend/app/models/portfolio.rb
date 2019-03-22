class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :transactions

  validates :name, uniqueness: { scope: :user,
    message: "User cannot have 2 portfolios of the same name" }

  # show an entire portfolio, go through all transactions and calculate stuff thats still there

  # show entire list of transactions that have happened in a portfolio

  # write method in portfolio model that returns object where keys are user's portfolios and values are objects where keys
  # are stock symbols and values are quantity owned
  # def getPortfolios
  #   @user = User.find(user.id)
  #   out = Hash.new
  #   @user.portfolios.each do |port|
  #     out[port.name] = {'id': port.id,
  #                       'holdings': port.transactions.group("symbol").sum('quantity')}
  #   end
  #   out
  # end
end
