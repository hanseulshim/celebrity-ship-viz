export default `
type Ship {
  id: Int
  shipName: String
  shipCode: String
  classId: Int
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

type BookingWeek {
  week: Int
  date: String
}

extend type Query {
 shipList: [Ship]
 productList(shipId: Int): [Product]
 itineraryList(shipId: Int, productId: Int): [Itinerary]
 sailingDateList(shipId: Int, productId: Int, itineraryId: Int): [SailingDate]
 bookingWeekList(sailingDate: String): [BookingWeek]
}
`
