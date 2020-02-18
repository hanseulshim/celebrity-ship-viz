import { Cabin } from '../models'

export default {
  Query: {
    deckList: async (_, { shipId }) => {
      if (!shipId) return []
      const deckList = await Cabin.query()
        .distinct('deck')
        .where('shipId', shipId)
        .orderBy('deck')
      return deckList.map(d => d.deck)
    },
    deckVisualList: async (
      _,
      {
        shipId,
        sailingDateId,
        interval,
        bookedOccupancy,
        bookingType,
        cabinCategory,
        cabinCategoryClass,
        cabinClassRate,
        channel,
        pointOfSaleMarket,
        rateCategory
      }
    ) => {
      if (!shipId || !sailingDateId || interval === null) return {}
      const deckList = await Cabin.query()
        .distinct('deck')
        .where('shipId', shipId)
        .orderBy('deck')
      const data = await Cabin.query()
        .skipUndefined()
        .select(
          'c.deck',
          'c.cabinNumber',
          'c.plotX0',
          'c.plotY0',
          'c.plotX1',
          'c.plotY1',
          's.bookingStatus',
          'c.cabinCapacity',
          's.bookedOccupancy'
        )
        .alias('c')
        .leftJoinRelated('snapshot', { alias: 's' })
        .where('c.shipId', shipId)
        .andWhere('s.sailingDateId', sailingDateId)
        .andWhere('s.interval', interval)
        .whereIn('s.bookedOccupancy', bookedOccupancy)
        .whereIn('s.bookingType', bookingType)
        .whereIn('c.cabinCategoryId', cabinCategory)
        .whereIn('c.cabinCategoryClassId', cabinCategoryClass)
        .whereIn('s.cabinClassRateId', cabinClassRate)
        .whereIn('s.channelId', channel)
        .whereIn('s.marketId', pointOfSaleMarket)
        .whereIn('s.rateCategoryId', rateCategory)
        .orderBy(['c.deck', 'c.cabinNumber'])
      const deckObj = {}
      deckList.forEach(({ deck }) => {
        deckObj[deck] = data.filter(d => d.deck === deck)
      })

      return deckObj
    }
  }
}
