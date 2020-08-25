export default `
input InputSubFilter {
  id: Int
  value: String
}
extend type Query {
  deckVisualList(
    shipId: Int
    sailingDate: String
    productId: Int
    itineraryId: Int
    interval: Int
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
    peerGroupBookedOccupancy: [String]
    peerGroupBookingType: [String]
    peerGroupCabinCategory: [Int]
    peerGroupCabinClassRate: [Int]
    peerGroupChannel: [Int]
    peerGroupPointOfSaleMarket: [Int]
    peerGroupRateCategory: [Int]
  ): JSON @auth
  deckList(shipId: Int): [Int] @auth
}
`
