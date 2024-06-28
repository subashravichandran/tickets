require 'rails_helper'

RSpec.describe Api::V1::HabitsController, type: :controller do
  let(:valid_habit) { { name: 'Sample', streak: 5 } }
  
  before(:each) do
    unless RSpec.current_example.metadata[:skip_before_each]
      @habit = Habit.create! valid_habit
    end
  end

  describe 'GET #index' do
    it 'returns success response' do
      get :index
      expect(response).to be_successful
    end
  end

  describe 'POST #create', :skip_before_each do
    it 'creates a new habit' do
      expect {
        post :create, params: { habit: valid_habit }
      }.to change(Habit, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it 'does not create a new habit with invalid params (blank name)' do
      expect {
        post :create, params: { habit: { name: '' } }
      }.to change(Habit, :count).by(0)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'PATCH #update' do
    it 'updates the habit' do
      put :update, params: { id: @habit.id, habit: { name: 'Updated' } }
      @habit.reload
      expect(@habit.name).to eq('Updated')
    end

    it 'does not update habit with invalid attributes' do
      put :update, params: { id: @habit.id, habit: { name: '' } }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'renders JSON response successfully' do
      put :update, params: { id: @habit.id, habit: { name: 'Updated' } }
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end
