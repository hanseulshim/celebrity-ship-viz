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
        .leftJoin('snapshot as s', function() {
          this.on('c.id', '=', 's.cabinId')
            .skipUndefined()
            .andOn('s.sailingDateId', '=', sailingDateId)
            .andOn('s.interval', '=', interval)
            .andOnIn('s.bookedOccupancy', bookedOccupancy)
            .andOnIn('s.bookingType', bookingType)
            .andOnIn('c.cabinCategoryId', cabinCategory)
            .andOnIn('c.cabinCategoryClassId', cabinCategoryClass)
            .andOnIn('s.cabinClassRateId', cabinClassRate)
            .andOnIn('s.channelId', channel)
            .andOnIn('s.marketId', pointOfSaleMarket)
            .andOnIn('s.rateCategoryId', rateCategory)
        })
        .where('c.shipId', shipId)
        .orderBy(['c.deck', 'c.cabinNumber'])
      const deckObj = {}
      deckList.forEach(({ deck }) => {
        deckObj[deck] = data.filter(d => d.deck === deck)
      })

      return deckObj
    }
  }
}
