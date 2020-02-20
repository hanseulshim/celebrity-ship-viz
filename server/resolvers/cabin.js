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
        .whereIn('s.bookedOccupancy', bookedOccupancy ? bookedOccupancy.map(v => v.value) : undefined)
        .whereIn('s.bookingType', bookingType ? bookingType.map(v => v.value) : undefined)
        .whereIn('c.cabinCategoryId', cabinCategory ? cabinCategory.map(v => v.id) : undefined)
        // .whereIn('c.cabinCategoryClassId', cabinCategoryClass ? cabinCategoryClass.map(v => v.id) : undefined) // no work
        // .whereIn('s.cabinClassRateId', cabinClassRate ? cabinClassRate.map(v => v.id) : undefined) // no work
        .whereIn('s.channelId', channel ? channel.map(v => v.id) : undefined)
        .whereIn('s.marketId', pointOfSaleMarket ? pointOfSaleMarket.map(v => v.id) : undefined)
        // .whereIn('s.rateCategoryId', rateCategory ? rateCategory.map(v => v.id) : undefined) // no work
        .orderBy(['c.deck', 'c.cabinNumber'])
      const deckObj = {}
      deckList.forEach(({ deck }) => {
        deckObj[deck] = data.filter(d => d.deck === deck)
      })

      return deckObj
    }
  }
}
