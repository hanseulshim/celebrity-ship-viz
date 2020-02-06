import { gql } from 'apollo-server-lambda'
import ship from './ship'
import cabin from './cabin'

export default gql`
  scalar Date
  ${ship}
  ${cabin}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
