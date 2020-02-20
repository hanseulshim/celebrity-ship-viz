import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
  query deckVisualList(
    $shipId: Int
    $sailingDateId: Int
    $interval: Int
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
      interval: $interval
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
export const GET_FIRST_SAIL_DATE = gql`
  {
    firstSailDate {
      ship {
        id
        shipName
        shipCode
        classId
        className
      }
      sailingDate {
        id
        sailingDate
      }
      interval
    }
  }
`
