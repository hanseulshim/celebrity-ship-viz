export default {
  peerGroupFilters: false,
  selectedShip: {},
  selectedProduct: {},
  selectedItinerary: {},
  selectedSailDate: {},
  selectedPeerShip: [],
  selectedPeerSailingDates: [],
  filter: {
    channel: [],
    bookingType: [],
    pointOfSaleMarket: [],
    cabinCategoryClass: [],
    cabinCategory: [],
    cabinClassRate: [],
    rateCategory: [],
    // maxOccupancy: [],
    bookedOccupancy: []
  },
  filterCount: {
    channel: 0,
    bookingType: 0,
    pointOfSaleMarket: 0,
    cabinCategoryClass: 0,
    cabinCategory: 0,
    cabinClassRate: 0,
    rateCategory: 0,
    // maxOccupancy: 0,
    bookedOccupancy: 0
  },
  selectedBookingWeek: null,
  selectedDeck: null,
  shipData: {}
}
