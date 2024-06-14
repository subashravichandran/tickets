class Api::V1::CountMeasuresController < ApplicationController
  before_action :set_count_measure, only: %i[ show update destroy ]

  # GET /count_measures
  def index
    @count_measures = CountMeasure.all

    render json: @count_measures
  end

  # GET /count_measures/1
  def show
    render json: @count_measure
  end

  # POST /count_measures
  def create
    @count_measure = CountMeasure.new(count_measure_params)

    if @count_measure.save
      render json: @count_measure, status: :created, location: @count_measure
    else
      render json: @count_measure.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /count_measures/1
  def update
    if @count_measure.update(count_measure_params)
      render json: @count_measure
    else
      render json: @count_measure.errors, status: :unprocessable_entity
    end
  end

  # DELETE /count_measures/1
  def destroy
    @count_measure.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_count_measure
      @count_measure = CountMeasure.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def count_measure_params
      params.require(:count_measure).permit(:name, :abbreviation)
    end
end
