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
