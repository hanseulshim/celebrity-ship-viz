export default `
extend type Query {
 deckList(shipId: Int, sailingDateId: Int, weeks: Int): JSON
}
`
