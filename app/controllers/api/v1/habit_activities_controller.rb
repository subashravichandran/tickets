class Api::V1::HabitActivitiesController < ApplicationController
  before_action :set_habit_activity, only: %i[ show ]
  before_action :set_habit, only: %i[ index create ]

  # GET /habit_activities
  def index
    @habit_activities = @habit.habit_activities

    render json: @habit_activities
  end

  # GET /habit_activities/1
  def show
    render json: @habit_activity
  end

  # POST /habit_activities
  def create
    @habit_activity = @habit.habit_activities.build(habit_activity_params)

    if @habit_activity.save
      render json: @habit_activity, status: :created, location: api_v1_habit_habit_activity_url(@habit.id, @habit_activity)
    else
      render json: @habit_activity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /habit_activities/1
  # def update
  #   if @habit_activity.update(habit_activity_params)
  #     render json: @habit_activity
  #   else
  #     render json: @habit_activity.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /habit_activities/1
  # def destroy
  #   @habit_activity.destroy!
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_habit_activity
      @habit_activity = HabitActivity.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def habit_activity_params
      params.require(:habit_activity).permit(:activity_count, :habit_id)
    end

    def set_habit
      @habit = Habit.find(params[:habit_id])
    end
end
