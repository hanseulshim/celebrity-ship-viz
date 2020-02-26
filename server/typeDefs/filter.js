export default `
type Filter {
  channel: [ChannelFilter]
  bookingType: [BookingTypeFilter]
  pointOfSaleMarket: [PointOfSaleMarketFilter]
  cabinCategoryClass: [CabinCategoryClassFilter]
  cabinCategory: [CabinCategoryFilter]
  cabinClassRate: [CabinClassRateFilter]
  rateCategory: [RateCategoryFilter]
  maxOccupancy: [MaxOccupancyFilter]
  bookedOccupancy: [BookedOccupancyFilter]
}

type ChannelFilter {
  id: Int
  value: String
}

type BookingTypeFilter {
  id: Int
  value: String
}

type PointOfSaleMarketFilter {
  id: Int
  value: String
}

type CabinCategoryClassFilter {
  id: Int
  value: String
}

type CabinCategoryFilter {
  id: Int
  value: String
}

type CabinClassRateFilter {
  id: Int
  value: String
}

type RateCategoryFilter {
  id: Int
  value: String
}

type MaxOccupancyFilter {
  id: Int
  value: String
}

type BookedOccupancyFilter {
  id: Int
  value: String
}


extend type Query {
 filter: Filter @auth
}
`
