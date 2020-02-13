export default `
extend type Query {
  deckVisualList(shipId: Int, sailingDateId: Int, weeks: Int): JSON
  deckList(shipId: Int, sailingDateId: Int, weeks: Int): [Int]
}
`
