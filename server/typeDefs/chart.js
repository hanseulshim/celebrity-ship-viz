export default `
type SupplyBurndown {
  selected: SupplyBurndownChart,
  all: SupplyBurndownChart,
  peerGroup: SupplyBurndownChart
}

type SupplyBurndownChart {
  x: [Int]
  y: [Float]
}

extend type Query {
  supplyBurndownChart(
    shipId: Int!,
    sailingDateId: Int!,
    bookedOccupancy: [String],
    bookingType: [String],
    cabinCategory: [Int],
    cabinCategoryClass: [Int],
    cabinClassRate: [Int],
    channel: [Int],
    pointOfSaleMarket: [Int],
    rateCategory: [Int]): SupplyBurndown @auth
}
`
