class Transaction < ApplicationRecord
  belongs_to :portfolio
  belongs_to :user

  validates :quantity, numericality: {message: "Quantity of stocks purchased must be a number"}
end
