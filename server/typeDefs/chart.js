export default `
type SupplyBurndown {
  selected: SupplyBurndownChart,
  all: SupplyBurndownChart,
  peerGroup: SupplyBurndownChart
}

type SupplyBurndownChart {
  x: [Int]
  y: [Int]
}

extend type Query {
  supplyBurndownChart(
    shipId: Int!,
    sailingDateId: Int!,
    interval: Int!,
    bookedOccupancy: [InputSubFilter],
    bookingType: [InputSubFilter],
    cabinCategory: [InputSubFilter],
    cabinCategoryClass: [InputSubFilter],
    cabinClassRate: [InputSubFilter],
    channel: [InputSubFilter],
    pointOfSaleMarket: [InputSubFilter],
    rateCategory: [InputSubFilter]): SupplyBurndown @auth
}
`
