import { Ship, Product, Itinerary, SailingDate } from '../models'
import moment from 'moment'

export default {
  Query: {
    shipList: async () =>
      Ship.query()
        .select('ship.*', 'class.name as className')
        .joinRelated('class')
        .orderBy('ship.id'),
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
      const arr = []
      const diff = moment(sailingDate).diff(moment(), 'weeks')
      for (let i = 0; i < 11; i++) {
        arr.push({
          week: diff + i,
          date: moment(sailingDate)
            .subtract(diff + i, 'weeks')
            .format('MM/DD/YY')
        })
      }
      return arr
    }
  }
}
