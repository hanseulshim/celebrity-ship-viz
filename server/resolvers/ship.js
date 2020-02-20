import { Ship, Product, Itinerary, SailingDate, Filter, SnapshotInterval } from '../models'
import { EDGE } from '../constants'
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
    productList: async (_, { shipId }) => {
      if (!shipId) return []
      return Product.query()
        .skipUndefined()
        .joinRelated('ships')
        .where('ships.id', shipId)
    },
    itineraryList: async (_, { shipId, productId }) => {
      if (!shipId) return []
      return Itinerary.query()
        .skipUndefined()
        .leftJoinRelated('[ships, products]')
        .where('ships.id', shipId)
        .andWhere('products.id', productId)
    },
    sailingDateList: async (_, { shipId, productId, itineraryId }) => {
      if (!shipId) return []
      return SailingDate.query()
        .alias('d')
        .distinct('d.id', 'd.sailingDate')
        .skipUndefined()
        .leftJoinRelated('[ships, products, itineraries]')
        .where('ships.id', shipId)
        .andWhere('products.id', productId)
        .andWhere('itineraries.id', itineraryId)
        .orderBy('d.sailingDate')
    },
    snapshotIntervalList: () => SnapshotInterval.query().orderBy('interval'),
    firstSailDate: async () => {
      const sailingDate = await SailingDate.query()
        .alias('d')
        .leftJoinRelated('ships')
        .orderBy('d.sailingDate')
        .findOne('ships.id', EDGE)
        .where('d.sailingDate', '>=', moment())
      const ship = await Ship.query()
        .select('ship.*', 'class.name as className')
        .joinRelated('class')
        .findById(EDGE)
      ship.shipName = ship.shipName.replace('CELEBRITY ', '')
      if (!sailingDate) {
        return {
          ship,
          sailingDate: null,
          interval: 0
        }
      }
      const diff = moment(sailingDate.sailingDate).diff(moment(), 'weeks')
      const interval = diff <= 0 ? 0 : diff
      return {
        ship,
        sailingDate,
        interval
      }
    },
    bookingWeekList: (_, { sailingDate = null }) => {
      if (!sailingDate) return []
      const arr = []
      const diff = moment(sailingDate).diff(moment(), 'weeks')
      const start = diff <= 0 ? 0 : diff
      for (let i = 0; i < 11; i++) {
        arr.push({
          week: start + i,
          date: moment(sailingDate)
            .subtract(start + i, 'weeks')
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
