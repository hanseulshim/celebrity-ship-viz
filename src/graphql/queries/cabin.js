import gql from 'graphql-tag'

export const GET_DECK_LIST = gql`
  query deckList($shipId: Int) {
    deckList(shipId: $shipId)
  }
`
