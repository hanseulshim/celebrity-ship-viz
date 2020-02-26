export default {
  name: 'Chart',
  endpoint: '',
  headers: { sessiontoken: process.env.SESSION_TOKEN },
  query: `
    {
      # supplyBurndownChart(
      #   shipId:4,
      #   sailingDateId:199
      # ) {
      #   selected {
      #     x,
      #     y
      #   },
      #   all {
      #     x,
      #     y
      #   },
      #   peerGroup {
      #     x,
      #     y
      #   }
      # }

      # cabinCategoryClassChart(
      #   shipId: 4,
      #   sailingDateId: 199,
      #   interval: 0
      # ) {
      #   bookedX
      #   availableX
      #   y
      # }

      deckChart(
        shipId: 4,
        sailingDateId: 199,
        interval: 0
      ) {
        bookedX
        availableX
        y
      }
    }`
}
