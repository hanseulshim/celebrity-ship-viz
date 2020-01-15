import { Ship, Product, Itinerary, SailingDate } from '../models'
import moment from 'moment'

export default {
  Query: {
    shipList: () => Ship.query(),
    productList: async (_, { shipId = null }) => {
      if (!shipId) return []
      return Product.query()
        .joinRelated('ships')
        .where('ships.id', shipId)
    },
    itineraryList: async (_, { shipId = null, productId = null }) => {
      if (!shipId || !productId) return []
      return Itinerary.query()
        .leftJoinRelated('[ships, products]')
        .where('ships.id', shipId)
        .andWhere('products.id', productId)
    },
    sailingDateList: async (
      _,
      { shipId = null, productId = null, itineraryId = null }
    ) => {
      if (!shipId || !productId || !itineraryId) return []
      return SailingDate.query()
        .leftJoinRelated('[ships, products, itineraries]')
        .where('ships.id', shipId)
        .andWhere('products.id', productId)
        .andWhere('itineraries.id', itineraryId)
    },
    bookingWeekList: (_, { sailingDate = null }) => {
      if (!sailingDate) return []
      return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(week => ({
        week,
        date: moment(sailingDate)
          .subtract(week, 'weeks')
          .format('MM/DD/YY')
      }))
    }
  }
}
