export default {
  name: 'Ship',
  endpoint: '',
  query: `
    {
      shipList {
        id
        shipName
        shipCode
        shipClass
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
    }`
}
