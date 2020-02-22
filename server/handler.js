import { ApolloServer } from 'apollo-server-lambda'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import playground from './playground'
import Knex from 'knex'
import { Model, knexSnakeCaseMappers } from 'objection'
import requireAuthDirective from './directives'
require('dotenv').config()

const db = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  ...knexSnakeCaseMappers()
})
Model.knex(db)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground,
  context: async ({ event }) => {
    const sessionToken = event.headers.sessiontoken || ''
    return { sessionToken }
  },
  schemaDirectives: {
    auth: requireAuthDirective
  }
})

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
})
