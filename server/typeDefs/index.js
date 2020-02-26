import { gql } from 'apollo-server-lambda'
import ship from './ship'
import cabin from './cabin'
import filter from './filter'
import chart from './chart'

export default gql`
  scalar Date
  scalar JSON
  directive @auth on FIELD_DEFINITION
  ${ship}
  ${cabin}
  ${filter}
  ${chart}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
