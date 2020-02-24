import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
  query deckVisualList(
    $shipId: Int
    $sailingDateId: Int
    $interval: Int
    $bookedOccupancy: [InputSubFilter]
    $bookingType: [InputSubFilter]
    $cabinCategory: [InputSubFilter]
    $cabinCategoryClass: [InputSubFilter]
    $cabinClassRate: [InputSubFilter]
    $channel: [InputSubFilter]
    $pointOfSaleMarket: [InputSubFilter]
    $rateCategory: [InputSubFilter]
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
