export default {
	name: 'Cabin',
	endpoint: '',
	headers: { sessiontoken: process.env.SESSION_TOKEN },
	query: `
    {
      deckList(shipId: 4)
      deckVisualList(
        shipId: 4,
        sailingDate: "03-01-2020",
        interval: 1,
        peerGroupShipIds: [4],
      )
    }`
}
