import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-lambda'

export default class RequireAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = this.defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const [, , context] = args
      if (context.sessionToken) {
        if (context.sessionToken !== process.env.SESSION_TOKEN) throw new ApolloError('Session token is invalid', 401)
        const result = await resolve.apply(this, args)
        return result
      } else {
        throw new ApolloError(
          'You must be signed in to view this resource.',
          401
        )
      }
    }
  }
}
