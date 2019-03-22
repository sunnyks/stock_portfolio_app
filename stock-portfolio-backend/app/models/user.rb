class User < ApplicationRecord
  has_many :portfolios
  has_many :transactions, through: :portfolios
  has_secure_password

  validates :username, uniqueness: true

  def getPortfolios
    out = Hash.new
    self.portfolios.each do |port|
      # spent = 0
      # port.transactions.each do |t|
      #   spent += t.quantity * t.price
      #   # if t.transtype == 'buy'
      #   #   spent += t.quantity * t.price
      #   # elsif t.transtype == 'sell'
      #   #   spent -= t.quantity * t.price
      #   # end
      # end
      # make each symbol in holdings an object that contains the quantity and the price originally bought at and date or somethin
      # actually don't do that but at least make it so you can find out how much you've made on each stock somehow idk
      holdings = Hash.new
      port.transactions.group("symbol").sum('quantity').each do |k, v|
        holdings[k] = {quantity: v, spent: getSpentOnHolding(port, k)}
      end
      out[port.name] = {'id': port.id,
                        'holdings': holdings}
    end
    out
  end

  def getSpentOnHolding(portfolio, symbol)
    spent = 0
    portfolio.transactions.where(symbol: symbol).each do |t|
      spent += t.quantity * t.price
    end
    spent
  end

end
