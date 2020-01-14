import { gql } from 'apollo-server-lambda'
import ship from './ship'

export default gql`
  scalar Date
  ${ship}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
