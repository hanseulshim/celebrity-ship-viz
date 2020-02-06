export default `
type ShipDeck {
  deck: Int
  cabinNumber: Int
  plotX0: Int
  plotY0: Int
  plotX1: Int
  plotY1: Int
  bookingStatus: String
  cabinColor: String
}

extend type Query {
 deckList: [ShipDeck]
}
`
