require "test_helper"

class TodoListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @todo_list = todo_lists(:one)
  end

  test "should get index" do
    get todo_lists_url, as: :json
    assert_response :success
  end

  test "should create todo_list" do
    assert_difference("TodoList.count") do
      post todo_lists_url, params: { todo_list: { created_at: @todo_list.created_at, execute_at: @todo_list.execute_at, name: @todo_list.name } }, as: :json
    end

    assert_response :created
  end

  test "should show todo_list" do
    get todo_list_url(@todo_list), as: :json
    assert_response :success
  end

  test "should update todo_list" do
    patch todo_list_url(@todo_list), params: { todo_list: { created_at: @todo_list.created_at, execute_at: @todo_list.execute_at, name: @todo_list.name } }, as: :json
    assert_response :success
  end

  test "should destroy todo_list" do
    assert_difference("TodoList.count", -1) do
      delete todo_list_url(@todo_list), as: :json
    end

    assert_response :no_content
  end
end
