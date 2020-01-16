import { Ship, Product, Itinerary, SailingDate, Filter } from '../models'
import moment from 'moment'

export default {
  Query: {
    shipList: async () => {
      const shipList = await Ship.query()
        .select('ship.*', 'class.name as className')
        .joinRelated('class')
        .orderBy('ship.id')
      return shipList.map(ship => ({
        ...ship,
        shipName: ship.shipName.replace('CELEBRITY ', '')
      }))
    },
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
    },
    filter: async () => {
      const filterPromiseList = [
        Filter.query().where('type', 1),
        Filter.query().where('type', 2),
        Filter.query().where('type', 3),
        Filter.query().where('type', 4),
        Filter.query().where('type', 5),
        Filter.query().where('type', 6),
        Filter.query().where('type', 7),
        Filter.query().where('type', 9)
      ]

      const filterList = await Promise.all(filterPromiseList)

      return {
        channel: filterList[0],
        bookingType: filterList[1],
        pointOfSaleMarket: filterList[2],
        cabinCategoryClass: filterList[3],
        cabinCategory: filterList[4],
        cabinClassRate: filterList[5],
        rateCategory: filterList[6],
        maxOccupancy: [],
        bookedOccupancy: filterList[7]
      }
    }
  }
}
