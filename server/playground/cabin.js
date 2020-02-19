export default {
  name: 'Cabin',
  endpoint: '',
  query: `
    {
      deckList(shipId: 4)
      deckVisualList(shipId: 4, sailingDateId: 199, interval: 5)
    }`
}
