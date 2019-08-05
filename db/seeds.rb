# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#csvファイルを扱うためのgemを読み込む
require "csv"

CSV.foreach('db/person_data.csv') do |row|

    Person.create(:name => row[0])

end

CSV.foreach('db/message_data.csv') do |row|

    Message.create(:content => row[0], :person_id => row[1])

end