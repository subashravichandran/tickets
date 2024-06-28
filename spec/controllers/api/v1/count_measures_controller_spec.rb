require 'rails_helper'

RSpec.describe Api::V1::CountMeasuresController, type: :controller do
  let(:valid_uom) { {name: 'Sample', abbreviation: 'SMP'} }
  let(:blank_uom) { {name: '', abbreviation: ''} }

  before(:each) do
    unless RSpec.current_example.metadata[:skip_before_each]
      @count_measure = CountMeasure.create! valid_uom
    end
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end
  end

  describe 'POST #create', :skip_before_each do
    it 'creates a new CountMeasure' do
      expect{
        post :create, params: { count_measure: valid_uom }
      }.to change(CountMeasure, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it 'doesnot create a new CountMeasure with invalid params' do
      expect {
        post :create, params: { count_measure: blank_uom }
    }.to change(CountMeasure, :count).by(0)
    expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'PUT/PATCH #update' do
    it 'updates the countMeasure' do
      put :update, params: { id: @count_measure.id, count_measure: { name: 'updated', abbreviation: 'UPD' }}
      @count_measure.reload
      expect(@count_measure.name).to eq('updated')
      expect(@count_measure.abbreviation).to eq('UPD')
    end

    it 'doesnot update the countMeasure with invalid attributes' do
      put :update, params: { id: @count_measure.id, count_measure: blank_uom }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'renders a JSON response with countMeasure' do
      put :update, params: { id: @count_measure.id, count_measure: valid_uom}
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    context 'with invalid abbreviation length' do
      it 'does not update the countMeasure (abbreviation length more than 3)' do
        put :update, params: { id: @count_measure.id, count_measure: { name: 'invalid', abbreviation: 'ABCD'}}
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not update the countMeasure (abbreviation length less than 1)' do
        put :update, params: { id: @count_measure.id, count_measure: { name: 'invalid', abbreviation: ''}}
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end