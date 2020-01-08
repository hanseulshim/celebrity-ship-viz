import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Product {
    id: Int
    name: String
  }

  type Ship {
    id: Int
    name: String
  }

  type Query {
    _empty: String
    productList: [Product]
    shipList: [Ship]
  }
  type Mutation {
    _empty: String
  }
`
