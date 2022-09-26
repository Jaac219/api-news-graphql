const userSchema = [`
  type User {
    userName: String!,
    name: String!,
    phone: String,
    address: Address,
    isRemove: Boolean
  }

  type Address {
    city: String,
    street: String,
    number: Int
  }

  input User_Filter{
    _id: String,
    userName: String,
    name: String,
    phone: String,
    address: Adress
  }



  type Query {
    User_Get(filter: User_Filter, option: Option):[User]
  }

  type Mutation{

  }
`]