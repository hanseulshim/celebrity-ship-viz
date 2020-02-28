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
  sailingDate: String
}

type SnapshotInterval {
  id: Int
  interval: Int
  intervalLabel: String
  weekMinimum: Int
}

type FirstSailDate {
  ship: Ship
  sailingDate: SailingDate
  interval: Int
}

extend type Query {
  shipList: [Ship] @auth
  productList(shipId: Int): [Product] @auth
  peerGroupProductList(shipIdList: [Int]): [Product] @auth
  itineraryList(shipId: Int, productId: Int): [Itinerary] @auth
  sailingDateList(shipId: Int, productId: Int, itineraryId: Int): [SailingDate] @auth
  snapshotIntervalList: [SnapshotInterval] @auth
  firstSailDate: FirstSailDate @auth
}
`
