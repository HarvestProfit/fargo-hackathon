class BackendSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  def self.id_from_object(object, _type_definition, _query_ctx)
    object.to_global_id
  end

  def self.object_from_id(global_id, _query_ctx)
    gid = GlobalID.parse(global_id)

    raise MapsApi::Graphql::Errors::ArgumentError, "#{global_id} is not a valid id." unless gid
    gid.find
  end

  def self.resolve_type(_type, obj, _ctx)
    case obj
    when County
      Types::CountyType
    else
      raise("Unexpected object: #{obj}")
    end
  end
end
