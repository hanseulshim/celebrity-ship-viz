export default `
type SupplyBurndownChart {
  selected: SupplyBurndownChartData
  all: SupplyBurndownChartData
  peerGroup: SupplyBurndownChartData
}

type SupplyBurndownChartData {
  x: [Int]
  y: [Float]
}

type CabinCategoryClassChart {
  bookedX: [Int]
  availableX: [Int]
  y: [String]
}

type DeckChart {
  bookedX: [Int]
  availableX: [Int]
  y: [String]
}

extend type Query {
  supplyBurndownChart(
    shipId: Int!
    sailingDateId: Int!
    productId: Int
    itineraryId: Int
    bookedOccupancy: [String]
    bookingType: [String]
    cabinCategory: [Int]
    cabinCategoryClass: [Int]
    cabinClassRate: [Int]
    channel: [Int]
    pointOfSaleMarket: [Int]
    rateCategory: [Int]
    peerGroupShipIds: [Int]
    peerGroupProductId: Int
    peerGroupStartDate: String
    peerGroupEndDate: String
    peerGroupBookedOccupancy: [String]
    peerGroupBookingType: [String]
    peerGroupCabinCategory: [Int]
    peerGroupCabinCategoryClass: [Int]
    peerGroupCabinClassRate: [Int]
    peerGroupChannel: [Int]
    peerGroupPointOfSaleMarket: [Int]
    peerGroupRateCategory: [Int]
  ): SupplyBurndownChart @auth
  cabinCategoryClassChart(
    shipId: Int!
    sailingDateId: Int!
    interval: Int!
  ): CabinCategoryClassChart @auth
  deckChart(
    shipId: Int!
    sailingDateId: Int!
    interval: Int!
  ): DeckChart @auth
}
`
