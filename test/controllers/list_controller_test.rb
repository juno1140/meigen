require 'test_helper'

class ListControllerTest < ActionDispatch::IntegrationTest
  test "should get personList" do
    get list_personList_url
    assert_response :success
  end

end
