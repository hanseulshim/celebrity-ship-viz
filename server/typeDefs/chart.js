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

extend type Query {
  supplyBurndownChart(
    shipId: Int!
    sailingDateId: Int!
    bookedOccupancy: [String]
    bookingType: [String]
    cabinCategory: [Int]
    cabinCategoryClass: [Int]
    cabinClassRate: [Int]
    channel: [Int]
    pointOfSaleMarket: [Int]
    rateCategory: [Int]): SupplyBurndownChart @auth
  cabinCategoryClassChart(
    shipId: Int!
    sailingDateId: Int!
    interval: Int!
  ): CabinCategoryClassChart @auth
}
`
