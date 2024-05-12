class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :jti
end
