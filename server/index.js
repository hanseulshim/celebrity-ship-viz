// import { resolvers } from './resolvers'
// import { typeDefs } from './typeDefs'
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
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
const datasetList = [
  {
    id: 1,
    name: 'Absolute Bookings'
  },
  {
    id: 2,
    name: 'Temporary Bookings'
  },
  {
    id: 3,
    name: 'Other Bookings'
  }
]

const bookingTypeList = [
  {
    id: 1,
    name: 'Individal & Group'
  },
  {
    id: 2,
    name: 'Individual'
  },
  {
    id: 3,
    name: 'Group'
  }
]

const productList = [
  {
    id: 1,
    name: 'TRANSATL'
  },
  {
    id: 2,
    name: 'TRANSPAC'
  }
]

const shipList = [
  {
    id: 1,
    name: 'APEX'
  },
  {
    id: 2,
    name: 'BRAVO'
  }
]

const resolvers = {
  Query: {
    datasetList: () => datasetList,
    bookingTypeList: () => bookingTypeList,
    productList: () => productList,
    shipList: () => shipList
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // <- allow request from all domains
    credentials: true
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
