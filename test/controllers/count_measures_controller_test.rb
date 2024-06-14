require "test_helper"

class CountMeasuresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @count_measure = count_measures(:one)
  end

  test "should get index" do
    get count_measures_url, as: :json
    assert_response :success
  end

  test "should create count_measure" do
    assert_difference("CountMeasure.count") do
      post count_measures_url, params: { count_measure: { abbreviation: @count_measure.abbreviation, name: @count_measure.name } }, as: :json
    end

    assert_response :created
  end

  test "should show count_measure" do
    get count_measure_url(@count_measure), as: :json
    assert_response :success
  end

  test "should update count_measure" do
    patch count_measure_url(@count_measure), params: { count_measure: { abbreviation: @count_measure.abbreviation, name: @count_measure.name } }, as: :json
    assert_response :success
  end

  test "should destroy count_measure" do
    assert_difference("CountMeasure.count", -1) do
      delete count_measure_url(@count_measure), as: :json
    end

    assert_response :no_content
  end
end
