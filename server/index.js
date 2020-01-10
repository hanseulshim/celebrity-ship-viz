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

  type Itinerary {
    id: Int
    name: String
  }

  type Query {
    _empty: String
    productList: [Product]
    shipList(id: Int): [Ship]
    itineraryList(id: Int): [Itinerary]
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

const shipList1 = [
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

const shipList2 = [
  {
    id: 4,
    name: 'Apex2'
  },
  {
    id: 5,
    name: 'Constellation2'
  },
  {
    id: 6,
    name: 'Eclipse2'
  }
]

const itineraryList = [
  {
    id: 1,
    name: '14 Night Spain & Portugal Transatlantic'
  },
  {
    id: 2,
    name: '7 Night Spain & Portugal Transatlantic'
  },
  {
    id: 3,
    name: '21 Night Spain & Portugal Transatlantic'
  }
]

const resolvers = {
  Query: {
    productList: () => productList,
    shipList: (_, { id }) =>
      id && id === 1 ? shipList1 : id && id > 1 ? shipList2 : [],
    itineraryList: (_, { id }) => (id ? itineraryList : [])
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
