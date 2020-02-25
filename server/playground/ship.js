export default {
  name: 'Ship',
  endpoint: '',
  headers: { sessiontoken: process.env.SESSION_TOKEN },
  query: `
    {
      # shipList {
      #   id
      #   shipName
      #   shipCode
      #   classId
      #   className
      # }

      # productList(shipId: null) {
      #   id
      #   rdssProductCode
      # }

      # itineraryList(shipId: null, productId: null) {
      #   id
      #   itineraryDesc
      # }

      # sailingDateList(shipId: null, productId: null, itineraryId: null) {
      #   id
      #   sailingDate
      # }

      # snapshotIntervalList {
      #   id
      #   interval
      #   intervalLabel
      #   weekMinimum
      # }

      # firstSailDate {
      #   ship {
      #     id
      #     shipName
      #     shipCode
      #     classId
      #     className
      #   }
      #   sailingDate {
      #     id
      #     sailingDate
      #   }
      #   interval
      # }

      # bookingWeekList(sailingDate: null) {
      #   week
      #   date
      # }
    }`
}
