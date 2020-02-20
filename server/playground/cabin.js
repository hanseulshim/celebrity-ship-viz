export default {
  name: 'Cabin',
  endpoint: '',
  headers: { sessiontoken: process.env.SESSION_TOKEN },
  query: `
    {
      deckList(shipId: 4)
      deckVisualList(shipId: 4, sailingDateId: 199, interval: 5)
    }`
}
