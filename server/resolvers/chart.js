import { Cabin, SnapshotInterval } from '../models'

export default {
  Query: {
    supplyBurndownChart: async (
      _,
      {
        shipId,
        sailingDateId,
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
      const { total } = await Cabin.query().sum('cabinCapacity as total')
        .findOne('shipId', shipId)

      const subQuery = Cabin.query()
        .skipUndefined()
        .sum('s.bookedOccupancy')
        .alias('c')
        .leftJoin('snapshot as s', function() {
          this.on('c.id', '=', 's.cabinId')
            .skipUndefined()
            .andOn('s.sailingDateId', '=', sailingDateId)
            .andOn('s.interval', '=', 'i.interval')
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
        .as('sum')

      const selected = {
        x: [],
        y: []
      }

      const selectedShipIntervals = await SnapshotInterval.query().select(['i.interval', subQuery]).alias('i')
        .orderBy('i.interval')

      selectedShipIntervals.forEach(snapshot => {
        const percent = Math.round((1 - (snapshot.sum / total)) * 100)
        selected.x.push(snapshot.interval)
        selected.y.push(percent)
      })

      return {
        selected,
        all: {
          x: [],
          y: []
        },
        peerGroup: {
          x: [],
          y: []
        }
      }
    }
  }
}
