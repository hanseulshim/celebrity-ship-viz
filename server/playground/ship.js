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

      snapshotIntervalList {
        id
        interval
        intervalLabel
        weekMinimum
      }

      firstSailDate {
        ship {
          id
          shipName
          shipCode
          classId
          className
        }
        sailingDate {
          id
          sailingDate
        }
        interval
      }

      bookingWeekList(sailingDate: null) {
        week
        date
      }

      filter {
        channel {
          id
          value
        }
        bookingType {
          id
          value
        }
        pointOfSaleMarket {
          id
          value
        }
        cabinCategoryClass {
          id
          value
        }
        cabinCategory {
          id
          value
        }
        cabinClassRate {
          id
          value
        }
        rateCategory {
          id
          value
        }
        maxOccupancy {
          id
          value
        }
        bookedOccupancy {
          id
          value
        }
      }
    }`
}
