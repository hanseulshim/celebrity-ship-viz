import gql from 'graphql-tag'

export const GET_DECK_LIST = gql`
  query deckList($shipId: Int, $sailingDateId: Int, $weeks: Int) {
    deckList(shipId: $shipId, sailingDateId: $sailingDateId, weeks: $weeks) {
      week
      date
    }
  }
`
