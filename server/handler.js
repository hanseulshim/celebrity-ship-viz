import { ApolloServer } from 'apollo-server-lambda'
import Knex from 'knex'
import { knexSnakeCaseMappers, Model } from 'objection'
import requireAuthDirective from './directives'
import playground from './playground'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
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
		const snapshotLimit = {
			minYear: 2017,
			maxYear: 2022,
			month: 11
		}
		return { sessionToken, snapshotLimit }
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
