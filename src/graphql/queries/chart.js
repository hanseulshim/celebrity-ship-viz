import gql from 'graphql-tag'

export const GET_SUPPLY_BURNDOWN_CHART = gql`
  query supplyBurndownChart($shipId: Int!, $sailingDateId: Int!) {
    supplyBurndownChart(shipId: $shipId, sailingDateId: $sailingDateId) {
      selected {
        x
        y
      }
      all {
        x
        y
      }
      peerGroup {
        x
        y
      }
    }
  }
`

export const GET_CABIN_CATEGORY_CLASS_CHART = gql`
  query cabinCategoryClassChart(
    $shipId: Int!
    $sailingDateId: Int!
    $interval: Int!
  ) {
    cabinCategoryClassChart(
      shipId: $shipId
      sailingDateId: $sailingDateId
      interval: $interval
    ) {
      bookedX
      availableX
      y
    }
  }
`

export const GET_DECK_CHART = gql`
  query deckChart($shipId: Int!, $sailingDateId: Int!, $interval: Int!) {
    deckChart(
      shipId: $shipId
      sailingDateId: $sailingDateId
      interval: $interval
    ) {
      bookedX
      availableX
      y
    }
  }
`
