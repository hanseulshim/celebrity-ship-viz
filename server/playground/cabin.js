export default {
  name: 'Cabin',
  endpoint: '',
  query: `
    {
      deckList {
        deck
        cabinNumber
        plotX0
        plotY0
        plotX1
        plotY1
        bookingStatus
        cabinColor
      }
    }`
}
