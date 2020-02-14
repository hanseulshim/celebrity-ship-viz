import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
  query deckVisualList(
    $shipId: Int
    $sailingDateId: Int
    $weeks: Int
    $bookedOccupancy: [Int]
    $bookingType: [Int]
    $cabinCategory: [Int]
    $cabinCategoryClass: [Int]
    $cabinClassRate: [Int]
    $channel: [Int]
    $pointOfSaleMarket: [Int]
    $rateCategory: [Int]
  ) {
    deckVisualList(
      shipId: $shipId
      sailingDateId: $sailingDateId
      weeks: $weeks
      bookedOccupancy: $bookedOccupancy
      bookingType: $bookingType
      cabinCategory: $cabinCategory
      cabinCategoryClass: $cabinCategoryClass
      cabinClassRate: $cabinClassRate
      channel: $channel
      pointOfSaleMarket: $pointOfSaleMarket
      rateCategory: $rateCategory
    )
  }
`
