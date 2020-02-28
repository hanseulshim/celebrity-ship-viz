import gql from 'graphql-tag'

export const GET_SUPPLY_BURNDOWN_CHART = gql`
  query supplyBurndownChart(
    $shipId: Int!
    $sailingDateId: Int!
    $productId: Int
    $itineraryId: Int
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
    $peerGroupCabinCategoryClass: [Int]
    $peerGroupCabinClassRate: [Int]
    $peerGroupChannel: [Int]
    $peerGroupPointOfSaleMarket: [Int]
    $peerGroupRateCategory: [Int]
    ) {
    supplyBurndownChart(
      shipId: $shipId
      sailingDateId: $sailingDateId
      productId: $productId
      itineraryId: $itineraryId
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
      peerGroupCabinCategoryClass: $peerGroupCabinCategoryClass
      peerGroupCabinClassRate: $peerGroupCabinClassRate
      peerGroupChannel: $peerGroupChannel
      peerGroupPointOfSaleMarket: $peerGroupPointOfSaleMarket
      peerGroupRateCategory: $peerGroupRateCategory
    ) {
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
