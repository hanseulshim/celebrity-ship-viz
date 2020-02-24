import gql from 'graphql-tag'

export const GET_SHIP_LIST = gql`
  {
    shipList {
      id
      shipName
      shipCode
      classId
      className
    }
  }
`
export const GET_PRODUCT_LIST = gql`
  query productList($shipId: Int) {
    productList(shipId: $shipId) {
      id
      rdssProductCode
    }
  }
`

export const GET_ITINERARY_LIST = gql`
  query itineraryList($shipId: Int, $productId: Int) {
    itineraryList(shipId: $shipId, productId: $productId) {
      id
      itineraryDesc
    }
  }
`

export const GET_SAILING_DATE_LIST = gql`
  query sailingDateList($shipId: Int, $productId: Int, $itineraryId: Int) {
    sailingDateList(
      shipId: $shipId
      productId: $productId
      itineraryId: $itineraryId
    ) {
      id
      sailingDate
    }
  }
`

export const GET_SUB_FILTERS = gql`
  {
    filter {
      channel {
        id
        value
      }
      bookingType {
        id
        value
      }
      pointOfSaleMarket {
        id
        value
      }
      cabinCategoryClass {
        id
        value
      }
      cabinCategory {
        id
        value
      }
      cabinClassRate {
        id
        value
      }
      rateCategory {
        id
        value
      }
      bookedOccupancy {
        id
        value
      }
    }
  }
`

export const GET_BOOKING_WEEK_LIST = gql`
  {
    snapshotIntervalList {
      id
      interval
      intervalLabel
      weekMinimum
    }
  }
`
