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

  type SailDate {
    id: Int
    date: String
  }

  type Query {
    _empty: String
    shipList: [Ship]
    productList(id: Int): [Product]
    itineraryList(id: Int): [Itinerary]
    sailDateList(id: Int): [SailDate]
  }
  type Mutation {
    _empty: String
  }
`

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
const productList1 = [
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
  }
]

const productList2 = [
  {
    id: 4,
    name: 'BAHAMA3'
  },
  {
    id: 5,
    name: 'BAHAMA4'
  },
  {
    id: 6,
    name: 'BERMUDA'
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

const sailDateList = [
  {
    id: 1,
    date: '09/06/2020'
  },
  {
    id: 2,
    date: '10/31/2020'
  },
  {
    id: 3,
    date: '4/15/2021'
  }
]

const resolvers = {
  Query: {
    shipList: () => shipList,
    productList: (_, { id }) =>
      id && id === 1 ? productList1 : id && id > 1 ? productList2 : [],
    itineraryList: (_, { id }) => (id ? itineraryList : []),
    sailDateList: (_, { id }) => (id ? sailDateList : [])
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
