import { Cabin, SnapshotInterval, CabinCategoryClass } from '../models'
import { ref } from 'objection'

export default {
  Query: {
    cabinCategoryClassChart: async (
      _,
      { shipId, sailingDateId, interval }
    ) => {
      const availableQuery = Cabin.query()
        .skipUndefined()
        .sum('c.cabinCapacity')
        .alias('c')
        .where('c.shipId', shipId)
        .andWhere('c.cabinCategoryClassId', ref('cc.id'))
        .as('available')
      const bookedQuery = Cabin.query()
        .skipUndefined()
        .sum('s.bookedOccupancy')
        .alias('c')
        .leftJoin('snapshot as s', function() {
          this.on('c.id', '=', 's.cabinId')
            .skipUndefined()
            .andOn('s.sailingDateId', '=', sailingDateId)
            .andOn('s.interval', '=', interval)
            .andOn('c.cabinCategoryClassId', '=', 'cc.id')
        })
        .where('c.shipId', shipId)
        .as('booked')
      const cabinCategoryList = await CabinCategoryClass.query().alias('cc')
        .select(['cc.cabinCategoryClass as category', availableQuery, bookedQuery])

      const obj = {
        bookedX: [],
        availableX: [],
        y: []
      }

      cabinCategoryList.forEach(cabinCategory => {
        obj.bookedX.push(cabinCategory.booked)
        obj.availableX.push(cabinCategory.available)
        obj.y.push(cabinCategory.category)
      })

      return obj
    },
    deckChart: async (
      _,
      { shipId, sailingDateId, interval }
    ) => {
      const bookedQuery = Cabin.query()
        .skipUndefined()
        .sum('s.bookedOccupancy')
        .alias('c1')
        .leftJoin('snapshot as s', function() {
          this.on('c1.id', '=', 's.cabinId')
            .skipUndefined()
            .andOn('s.sailingDateId', '=', sailingDateId)
            .andOn('s.interval', '=', interval)
            .andOn('c1.deck', '=', 'c.deck')
        })
        .where('c1.shipId', shipId)
        .as('booked')
      const deckList = await Cabin.query().alias('c')
        .select(['c.deck', bookedQuery])
        .sum('c.cabinCapacity as available')
        .where('c.shipId', shipId)
        .groupBy('c.deck')
        .orderBy('c.deck')

      const obj = {
        bookedX: [],
        availableX: [],
        y: []
      }

      deckList.forEach(deck => {
        const percent = deck.available ? Math.round(deck.booked / deck.available * 100) : deck.booked ? 100 : 0
        obj.bookedX.push(percent)
        obj.availableX.push(100 - percent)
        obj.y.push(`Deck ${deck.deck}`)
      })

      return obj
    },
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
      const { total } = await Cabin.query()
        .sum('cabinCapacity as total')
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

      const selectedShipIntervals = await SnapshotInterval.query()
        .select(['i.interval', subQuery])
        .alias('i')
        .orderBy('i.interval')

      selectedShipIntervals.forEach(snapshot => {
        const percent = Math.round((1 - snapshot.sum / total) * 100)
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
