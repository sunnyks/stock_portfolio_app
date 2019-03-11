class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :transactions

  # show an entire portfolio, go through all transactions and calculate stuff thats still there

  # show entire list of transactions that have happened at all
end
