import pkg from 'graphql-iso-date';
const { GraphQLDateTime } = pkg;

const Scalar = [`
    scalar GraphQLDateTime,
    scalar JSONObject
`]

export default Scalar;