class RenameTitreColumnToMessages < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :person_name, :person_id
  end
end
