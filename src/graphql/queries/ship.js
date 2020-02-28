import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
  query deckVisualList(
    $shipId: Int
    $sailingDateId: Int
    $productId: Int
    $itineraryId: Int
    $interval: Int
    $bookedOccupancy: [String]
    $bookingType: [String]
    $cabinCategory: [Int]
    $cabinCategoryClass: [Int]
    $cabinClassRate: [Int]
    $channel: [Int]
    $pointOfSaleMarket: [Int]
    $rateCategory: [Int]
    $peerGroupShipIds: [Int]
    $peerGroupProductId: Int
    $peerGroupStartDate: String
    $peerGroupEndDate: String
    $peerGroupBookedOccupancy: [String]
    $peerGroupBookingType: [String]
    $peerGroupCabinCategory: [Int]
    $peerGroupCabinClassRate: [Int]
    $peerGroupChannel: [Int]
    $peerGroupPointOfSaleMarket: [Int]
    $peerGroupRateCategory: [Int]
  ) {
    deckVisualList(
      shipId: $shipId
      sailingDateId: $sailingDateId
      productId: $productId
      itineraryId: $itineraryId
      interval: $interval
      bookedOccupancy: $bookedOccupancy
      bookingType: $bookingType
      cabinCategory: $cabinCategory
      cabinCategoryClass: $cabinCategoryClass
      cabinClassRate: $cabinClassRate
      channel: $channel
      pointOfSaleMarket: $pointOfSaleMarket
      rateCategory: $rateCategory
      peerGroupShipIds: $peerGroupShipIds
      peerGroupProductId: $peerGroupProductId
      peerGroupStartDate: $peerGroupStartDate
      peerGroupEndDate: $peerGroupEndDate
      peerGroupBookedOccupancy: $peerGroupBookedOccupancy
      peerGroupBookingType: $peerGroupBookingType
      peerGroupCabinCategory: $peerGroupCabinCategory
      peerGroupCabinClassRate: $peerGroupCabinClassRate
      peerGroupChannel: $peerGroupChannel
      peerGroupPointOfSaleMarket: $peerGroupPointOfSaleMarket
      peerGroupRateCategory: $peerGroupRateCategory
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
