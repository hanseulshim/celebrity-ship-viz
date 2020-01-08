const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
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
    shipList(productId: Int): [Ship]
  }
  type Mutation {
    _empty: String
  }
`

const productList = [
  {
    id: 1,
    name: 'TRANSATL'
  },
  {
    id: 2,
    name: 'TRANSPAC'
  },
  {
    id: 3,
    name: 'INDIART'
  },
  {
    id: 4,
    name: 'HAWAII'
  }
]

const shipList = [
  {
    id: 1,
    name: 'Apex'
  },
  {
    id: 2,
    name: 'Constellation'
  },
  {
    id: 3,
    name: 'Eclipse'
  }
]

const resolvers = {
  Query: {
    productList: () => productList,
    shipList: (_, { id = null }) => (id ? shipList : shipList)
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
