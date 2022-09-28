const commentSchema = [`
  type Comment {
    _id: String!,
    date: GraphQLDateTime,
    body: String,
    userId: String!,
    noticeId: String!,
    user: User,
    notice: Notice,
    isRemove: Boolean
  }

  type Query {
    Comment_Get(filter: Comment_Filter, option: Option):[Comment]
  }

  type Mutation{
    Comment_Save(commentInput: Comment_Input):ID
    Comment_Delete(_id: String!):Boolean
  }

  input Comment_Filter{
    _id: String,
    date: GraphQLDateTime,
    body: String,
    userId: String,
    noticeId: String
  }

  input Comment_Input{
    _id: String,
    date: GraphQLDateTime,
    body: String,
    userId: String,
    noticeId: String
  }

  input Option {
    skip: Int
    limit: Int
  }
`]

module.exports =  commentSchema;