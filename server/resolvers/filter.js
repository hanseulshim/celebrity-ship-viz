import {
  Filter,
  Channel,
  PointOfSaleMarket,
  CabinCategoryClass,
  CabinCategory,
  CabinClassRate,
  RateCategory
} from '../models'

export default {
  Query: {

    filter: async () => {
      const filterPromiseList = [
        Channel.query().select({ id: 'id', value: 'channelLabel' }),
        Filter.query().where('type', 2),
        PointOfSaleMarket.query().select({ id: 'id', value: 'marketLabel' }),
        CabinCategoryClass.query().select({ id: 'id', value: 'cabinCategoryClass' }),
        CabinCategory.query().select({ id: 'id', value: 'cabinCategoryLabel' }),
        CabinClassRate.query().select({ id: 'id', value: 'cabinClassRate' }),
        RateCategory.query().select({ id: 'id', value: 'rateCategory' }),
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
