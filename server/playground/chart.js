export default {
	name: 'Chart',
	endpoint: '',
	headers: { sessiontoken: process.env.SESSION_TOKEN },
	query: `
    {
      # supplyBurndownChart(
      #   shipId: 2,
      #   sailingDate: "03-01-2019",
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
      #  shipId: 2,
      #  sailingDate: "03-01-2019",
      #  interval: 0
      # ) {
      #   bookedX
      #   availableX
      #   y
      # }

      deckChart(
        shipId: 2,
        sailingDate: "03-01-2019",
        interval: 0
      ) {
        bookedX
        availableX
        y
      }
    }`
}
