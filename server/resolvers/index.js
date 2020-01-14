import ship from './ship'
import merge from 'lodash/merge'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default {
  ...merge(ship),
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
  })
}
