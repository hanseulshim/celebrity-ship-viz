import { Cabin, CabinCategoryClass, Itinerary } from '../models'
import { ref } from 'objection'

export const getSelectedShipList = async (
  shipId,
  sailingDateId,
  productId,
  itineraryIdList,
  interval,
  bookedOccupancy,
  bookingType,
  cabinCategory,
  cabinCategoryClass,
  cabinClassRate,
  channel,
  pointOfSaleMarket,
  rateCategory
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
        .andOn('s.productId', '=', productId)
        .andOnIn('s.itineraryId', itineraryIdList)
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

export const getPeerGroupList = async (
  shipId,
  sailingDateId,
  productId,
  itineraryIdList,
  interval,
  bookedOccupancy,
  bookingType,
  cabinCategory,
  cabinCategoryClass,
  cabinClassRate,
  channel,
  pointOfSaleMarket,
  rateCategory,
  peerGroupShipIds,
  peerGroupProductId,
  peerGroupStartDate,
  peerGroupEndDate,
  peerGroupBookedOccupancy,
  peerGroupBookingType,
  peerGroupCabinCategoryClass,
  peerGroupCabinCategory,
  peerGroupCabinClassRate,
  peerGroupChannel,
  peerGroupPointOfSaleMarket,
  peerGroupRateCategory
) => {
  if (!shipId || !sailingDateId || interval === null) return {}
  const selectedAvailableQuery = Cabin.query()
    .skipUndefined()
    .sum('c.cabinCapacity')
    .alias('c')
    .leftJoin('snapshot as s', 'c.id', 's.cabinId')
    .where('c.shipId', shipId)
    .andWhere('c.cabinCategoryClassId', ref('cc.id'))
    .andWhere('s.sailingDateId', sailingDateId)
    .andWhere('s.interval', interval)
    .andWhere('s.productId', productId)
    .whereIn('s.itineraryId', itineraryIdList)
    .whereIn('s.bookedOccupancy', bookedOccupancy)
    .whereIn('s.bookingType', bookingType)
    .whereIn('c.cabinCategoryId', cabinCategory)
    .whereIn('s.cabinClassRateId', cabinClassRate)
    .whereIn('s.channelId', channel)
    .whereIn('s.marketId', pointOfSaleMarket)
    .whereIn('s.rateCategoryId', rateCategory)
    .as('selectedAvailable')
  const selectedBookedQuery = Cabin.query()
    .skipUndefined()
    .sum('s.bookedOccupancy')
    .alias('c')
    .leftJoin('snapshot as s', 'c.id', 's.cabinId')
    .where('c.shipId', shipId)
    .andWhere('c.cabinCategoryClassId', ref('cc.id'))
    .andWhere('s.sailingDateId', sailingDateId)
    .andWhere('s.interval', interval)
    .andWhere('s.productId', productId)
    .whereIn('s.itineraryId', itineraryIdList)
    .whereIn('s.bookedOccupancy', bookedOccupancy)
    .whereIn('s.bookingType', bookingType)
    .whereIn('c.cabinCategoryId', cabinCategory)
    .whereIn('s.cabinClassRateId', cabinClassRate)
    .whereIn('s.channelId', channel)
    .whereIn('s.marketId', pointOfSaleMarket)
    .whereIn('s.rateCategoryId', rateCategory)
    .as('selectedBooked')
  const peerGroupAvailableQuery = Cabin.query()
    .skipUndefined()
    .sum('c.cabinCapacity')
    .alias('c')
    .leftJoin('snapshot as s', 'c.id', 's.cabinId')
    .leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
    .whereIn('c.shipId', peerGroupShipIds)
    .andWhere('sd.sailingDate', '>', peerGroupStartDate)
    .andWhere('sd.sailingDate', '<', peerGroupEndDate)
    .andWhere('s.interval', '=', interval)
    .andWhere('s.productId', '=', peerGroupProductId)
    .andWhere('c.cabinCategoryClassId', ref('cc.id'))
    .whereIn('s.bookedOccupancy', peerGroupBookedOccupancy)
    .whereIn('s.bookingType', peerGroupBookingType)
    .whereIn('c.cabinCategoryId', peerGroupCabinCategory)
    .whereIn('s.cabinClassRateId', peerGroupCabinClassRate)
    .whereIn('s.channelId', peerGroupChannel)
    .whereIn('s.marketId', peerGroupPointOfSaleMarket)
    .whereIn('s.rateCategoryId', peerGroupRateCategory)
    .as('peerGroupAvailable')
  const peerGroupBookedQuery = Cabin.query()
    .skipUndefined()
    .sum('s.bookedOccupancy')
    .alias('c')
    .leftJoin('snapshot as s', 'c.id', 's.cabinId')
    .leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
    .whereIn('c.shipId', peerGroupShipIds)
    .andWhere('sd.sailingDate', '>', peerGroupStartDate)
    .andWhere('sd.sailingDate', '<', peerGroupEndDate)
    .andWhere('s.interval', '=', interval)
    .andWhere('s.productId', '=', peerGroupProductId)
    .andWhere('c.cabinCategoryClassId', ref('cc.id'))
    .whereIn('s.bookedOccupancy', peerGroupBookedOccupancy)
    .whereIn('s.bookingType', peerGroupBookingType)
    .whereIn('c.cabinCategoryId', peerGroupCabinCategory)
    .whereIn('s.cabinClassRateId', peerGroupCabinClassRate)
    .whereIn('s.channelId', peerGroupChannel)
    .whereIn('s.marketId', peerGroupPointOfSaleMarket)
    .whereIn('s.rateCategoryId', peerGroupRateCategory)
    .as('peerGroupBooked')
  const cabinCategoryList = await CabinCategoryClass.query()
    .alias('cc')
    .skipUndefined()
    .whereIn('cc.id', peerGroupCabinCategoryClass)
    .select([
      'cc.id as id',
      'cc.cabinCategoryClass as category',
      selectedAvailableQuery,
      selectedBookedQuery,
      peerGroupAvailableQuery,
      peerGroupBookedQuery
    ])
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
      's.bookedOccupancy',
      'c.cabinCategoryClassId'
    )
    .alias('c')
    .leftJoin('snapshot as s', function() {
      this.on('c.id', '=', 's.cabinId')
        .skipUndefined()
        .andOn('s.sailingDateId', '=', sailingDateId)
        .andOn('s.interval', '=', interval)
        .andOn('s.productId', '=', productId)
        .andOnIn('s.itineraryId', itineraryIdList)
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
  const cabinCategoryObj = {}
  const deckObj = {}
  cabinCategoryList.forEach(categoryClass => {
    const {
      id,
      category,
      selectedAvailable,
      selectedBooked,
      peerGroupAvailable,
      peerGroupBooked
    } = categoryClass
    const selectedPercent = (selectedBooked / selectedAvailable * 100).toFixed(2)
    const peerGroupPercent = (peerGroupBooked / peerGroupAvailable * 100).toFixed(2)
    const difference = (selectedPercent - peerGroupPercent).toFixed(2)
    cabinCategoryObj[id] = {
      category,
      selectedPercent: isNaN(selectedPercent) ? null : selectedPercent,
      peerGroupPercent: isNaN(peerGroupPercent) ? null : peerGroupPercent,
      difference: isNaN(difference) ? null : difference
    }
  })
  deckList.forEach(({ deck }) => {
    deckObj[deck] = data
      .filter(d => d.deck === deck)
      .map(cabin => ({
        ...cabin,
        ...cabinCategoryObj[cabin.cabinCategoryClassId]
      }))
  })
  return deckObj
}

export const getItineraryIdList = async itineraryId => {
  if (!itineraryId) return undefined
  const itinerary = await Itinerary.query().findById(itineraryId)
  const itineraryList = await Itinerary.query().where('itineraryDesc', itinerary.itineraryDesc)
  return itineraryList.map(i => i.id)
}
