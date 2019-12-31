import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Dataset {
    id: Int
    name: String
  }

  type BookingType {
    id: Int
    name: String
  }

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
    datasetList: [Dataset]
    bookingTypeList: [BookingType]
    productList: [Product]
    shipList: [Ship]
  }
  type Mutation {
    _empty: String
  }
`
