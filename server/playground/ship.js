export default {
  name: 'Ship',
  endpoint: '',
  query: `
    {
      shipList {
        id
        shipName
        shipCode
        classId
        className
      }

      productList(shipId: null) {
        id
        rdssProductCode
      }

      itineraryList(shipId: null, productId: null) {
        id
        itineraryDesc
      }

      sailingDateList(shipId: null, productId: null, itineraryId: null) {
        id
        sailingDate
      }

      bookingWeekList(sailingDate: null) {
        week
        date
      }
    }`
}
