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
 shipList: [Ship]
 productList(shipId: Int): [Product]
 itineraryList(shipId: Int, productId: Int): [Itinerary]
 sailingDateList(shipId: Int, productId: Int, itineraryId: Int): [SailingDate]
 snapshotIntervalList: [SnapshotInterval]
 bookingWeekList(sailingDate: String): [BookingWeek]
 filter: Filter
}
`
