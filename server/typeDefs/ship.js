export default `
type Ship {
  id: Int
  shipName: String
  shipCode: String
  classId: Int
  className: String
}

type Product {
  id: Int
  rdssProductCode: String
}

type Itinerary {
  id: Int
  itineraryDesc: String
}

type SailingDate {
  id: Int
  sailingDate: Date
}

type SnapshotInterval {
  id: Int
  interval: Int
  intervalLabel: String
  weekMinimum: Int
}

type BookingWeek {
  week: Int
  date: String
}

type FirstSailDate {
  ship: Ship
  sailingDate: SailingDate
  interval: Int
}

type Filter {
  channel: [SubFilter]
  bookingType: [SubFilter]
  pointOfSaleMarket: [SubFilter]
  cabinCategoryClass: [SubFilter]
  cabinCategory: [SubFilter]
  cabinClassRate: [SubFilter]
  rateCategory: [SubFilter]
  maxOccupancy: [SubFilter]
  bookedOccupancy: [SubFilter]
}

type SubFilter {
  id: Int
  value: String
}

extend type Query {
 shipList: [Ship] @auth
 productList(shipId: Int): [Product] @auth
 itineraryList(shipId: Int, productId: Int): [Itinerary] @auth
 sailingDateList(shipId: Int, productId: Int, itineraryId: Int): [SailingDate] @auth
 snapshotIntervalList: [SnapshotInterval] @auth
 firstSailDate: FirstSailDate @auth
 bookingWeekList(sailingDate: String): [BookingWeek] @auth
 filter: Filter @auth
}
`
