const NoticeSchema = [`
  type Notice {
    _id: String!,
    title: String!,
    body: String!,
    date: GraphQLDateTime,
    userId: String!,
    user: User,
    comment: [Comment],
    isRemove: Boolean
  }

  type Query{
    Notice_Get(filter: Notice_Filter, option: Option):[Notice]
  }

  type Mutation{
    Notice_Save(noticeInput: Notice_Input):ID
    Notice_Delete(_id: String!):Boolean
  }

  input Notice_Filter {
    _id: String,
    title: String,
    body: String,
    date: GraphQLDateTime,
    userId: String,
    user: User_Input
  }

  input Notice_Input{
    _id: String,
    title: String,
    body: String,
    date: GraphQLDateTime,
    userId: String
  }
`]
module.exports = NoticeSchema