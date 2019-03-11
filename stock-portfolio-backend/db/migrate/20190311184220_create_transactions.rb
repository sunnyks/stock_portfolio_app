class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.references :portfolio, foreign_key: true
      t.references :user, foreign_key: true
      t.string :symbol
      t.string :type
      t.datetime :date
      t.int :quantity
      t.decimal :price
      t.text :note

      t.timestamps
    end
  end
end
