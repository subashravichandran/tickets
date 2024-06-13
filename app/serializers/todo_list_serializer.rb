class TodoListSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :execute_at 

  attribute :execute_at do |object|
    object.execute_at.strftime("%B %d, %Y %H:%M") if object.execute_at.present?
  end
end
