export default {
  name: 'Filter',
  endpoint: '',
  headers: { sessiontoken: process.env.SESSION_TOKEN },
  query: `
    {
      # filter {
      #   channel {
      #     id
      #     value
      #   }
      #   bookingType {
      #     id
      #     value
      #   }
      #   pointOfSaleMarket {
      #     id
      #     value
      #   }
      #   cabinCategoryClass {
      #     id
      #     value
      #   }
      #   cabinCategory {
      #     id
      #     value
      #   }
      #   cabinClassRate {
      #     id
      #     value
      #   }
      #   rateCategory {
      #     id
      #     value
      #   }
      #   maxOccupancy {
      #     id
      #     value
      #   }
      #   bookedOccupancy {
      #     id
      #     value
      #   }
      # }
    }`
}
