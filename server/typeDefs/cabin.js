export default `
input InputSubFilter {
  id: Int
  value: String
}
extend type Query {
  deckVisualList(
    shipId: Int,
    sailingDateId: Int,
    interval: Int,
    bookedOccupancy: [String],
    bookingType: [String],
    cabinCategory: [Int],
    cabinCategoryClass: [Int],
    cabinClassRate: [Int],
    channel: [Int],
    pointOfSaleMarket: [Int],
    rateCategory: [Int]): JSON @auth
  deckList(shipId: Int): [Int] @auth
}
`
