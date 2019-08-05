class ListController < ApplicationController
  
  def personList
    @people = Person.all()
  end

  def personDetails
    @person = Person.find(params[:id])
    @messages = Message.where("person_id = ?", params[:id])
  end

end
