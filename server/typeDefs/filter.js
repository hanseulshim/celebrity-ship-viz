export default `
type Filter {
  channel: [Channel]
  bookingType: [BookingType]
  pointOfSaleMarket: [PointOfSaleMarket]
  cabinCategoryClass: [CabinCategoryClass]
  cabinCategory: [CabinCategory]
  cabinClassRate: [CabinClassRate]
  rateCategory: [RateCategory]
  maxOccupancy: [MaxOccupancy]
  bookedOccupancy: [BookedOccupancy]
}

type Channel {
  id: Int
  value: String
}

type BookingType {
  id: Int
  value: String
}

type PointOfSaleMarket {
  id: Int
  value: String
}

type CabinCategoryClass {
  id: Int
  value: String
}

type CabinCategory {
  id: Int
  value: String
}

type CabinClassRate {
  id: Int
  value: String
}

type RateCategory {
  id: Int
  value: String
}

type MaxOccupancy {
  id: Int
  value: String
}

type BookedOccupancy {
  id: Int
  value: String
}


extend type Query {
 filter: Filter @auth
}
`
