const userSchema = [`
  type User {
    _id: String!,
    userName: String!,
    name: String!,
    phone: String,
    address: User_Address,
    isRemove: Boolean
  }

  type User_Address {
    city: String,
    street: String,
    number: Int
  }

  type Query {
    User_Get(filter: User_Filter, option: Option):[User]
    User_Count(filter: User_Filter):Int
    User_Address: [User_Address]
  }

  type Mutation{
    User_Save(userInput: User_Input):ID
    User_Delete(_id: String!):Boolean
  }

  input User_Filter{
    _id: String,
    userName: String,
    name: String,
    phone: String,
    address: Address_Input
  }

  input User_Input{
    _id: String,
    userName: String,
    name: String,
    phone: String,
    address: Address_Input
  }

  input Address_Input{
    city: String,
    street: String,
    number: Int
  }

  input Option {
    skip: Int
    limit: Int
  }
`]

export default userSchema;