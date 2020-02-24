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
    bookedOccupancy: [InputSubFilter],
    bookingType: [InputSubFilter],
    cabinCategory: [InputSubFilter],
    cabinCategoryClass: [InputSubFilter],
    cabinClassRate: [InputSubFilter],
    channel: [InputSubFilter],
    pointOfSaleMarket: [InputSubFilter],
    rateCategory: [InputSubFilter]): JSON @auth
  deckList(shipId: Int): [Int] @auth
}
`
