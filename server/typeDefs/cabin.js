export default `
extend type Query {
  deckVisualList(
    shipId: Int,
    sailingDateId: Int,
    weeks: Int,
    bookedOccupancy: [Int],
    bookingType: [Int],
    cabinCategory: [Int],
    cabinCategoryClass: [Int],
    cabinClassRate: [Int],
    channel: [Int],
    pointOfSaleMarket: [Int],
    rateCategory: [Int]): JSON
  deckList(shipId: Int): [Int]
}
`
