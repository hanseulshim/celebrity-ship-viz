import { Cabin } from '../models'
const { raw } = require('objection')

export default {
  Query: {
    deckList: async () => {
      const uniqueDecks = await Cabin.query().distinct(
        'c.deck'
      )
        .alias('c')
        .leftJoinRelated('bookingSnapshotWeeks', { alias: 's' })
        .where('c.shipId', 4)
        .andWhere('s.sailingDateId', 199)
        .andWhere('s.weeks', 5)
        .orderBy('c.deck')
      const deckList = await Cabin.query().select(
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
        .where('c.shipId', 4)
        .andWhere('s.sailingDateId', 199)
        .andWhere('s.weeks', 5)
        .orderBy(['c.deck', 'c.cabinNumber'])
      const deckObj = {}
      uniqueDecks.forEach(({ deck }) => {
        deckObj[deck] = deckList.filter(d => d.deck === deck)
      })

      console.log(deckObj)
    }

  }
}
