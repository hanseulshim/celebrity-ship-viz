import ship from './ship'
import cabin from './cabin'
import filter from './filter'
import merge from 'lodash/merge'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import GraphQLJSON from 'graphql-type-json'

export default {
  ...merge(ship, cabin, filter),
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    }
  }),
  JSON: GraphQLJSON
}
