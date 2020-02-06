import { Cabin } from '../models'
const { raw } = require('objection')

export default {
  Query: {
    deckList: async (_, { shipId, sailingDateId, weeks }) => {
      if (!shipId || !sailingDateId || !weeks) return {}
      const uniqueDecks = await Cabin.query().skipUndefined()
        .distinct('c.deck')
        .alias('c')
        .leftJoinRelated('bookingSnapshotWeeks', { alias: 's' })
        .where('c.shipId', shipId)
        .andWhere('s.sailingDateId', sailingDateId)
        .andWhere('s.weeks', weeks)
        .orderBy('c.deck')
      const deckList = await Cabin.query().skipUndefined()
        .select(
          'c.deck',
          'c.cabinNumber',
          'c.plotX0',
          'c.plotY0',
          'c.plotX1',
          'c.plotY1',
          's.bookingStatus',
          raw(`CASE
            WHEN s.booking_status IS NULL THEN 'GREY'
            WHEN (s.booking_status = 'U' OR s.booking_status = 'C') THEN 'RED'
            WHEN s.booked_occupancy < c.cabin_capacity THEN 'YELLOW'
            ELSE 'GREEN'
          END as "cabinColor"`)
        )
        .alias('c')
        .leftJoinRelated('bookingSnapshotWeeks', { alias: 's' })
        .where('c.shipId', shipId)
        .andWhere('s.sailingDateId', sailingDateId)
        .andWhere('s.weeks', weeks)
        .orderBy(['c.deck', 'c.cabinNumber'])
      const deckObj = {}
      uniqueDecks.forEach(({ deck }) => {
        deckObj[deck] = deckList.filter(d => d.deck === deck)
      })

      return deckObj
    }
  }
}
