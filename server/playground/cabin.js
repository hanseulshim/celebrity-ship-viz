export default {
  name: 'Cabin',
  endpoint: '',
  query: `
    {
      deckList(shipId: 4, sailingDateId: 199, weeks: 5)
    }`
}
