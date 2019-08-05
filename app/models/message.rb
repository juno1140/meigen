class Message < ApplicationRecord
    belongs_to :person
    validates :content, {presence: true}
    validates :person_id, {presence: true}
end
