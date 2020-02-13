import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
  query deckVisualList($shipId: Int, $sailingDateId: Int, $weeks: Int) {
    deckVisualList(
      shipId: $shipId
      sailingDateId: $sailingDateId
      weeks: $weeks
    ) {
      week
      date
    }
  }
`
