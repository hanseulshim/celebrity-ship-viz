import moment from 'moment'
import { ref } from 'objection'
import { Cabin, CabinCategoryClass, Itinerary } from '../models'

export const getSelectedShipList = async (
	shipId,
	sailingDate,
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
	if (!shipId || !sailingDate || interval === null) return {}
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
		.leftJoin(
			`snapshot_${moment(sailingDate).format('YYYY_MM')} as s`,
			function () {
				this.on('c.id', '=', 's.cabinId')
					.skipUndefined()
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
			}
		)
		.where('c.shipId', shipId)
		.orderBy(['c.deck', 'c.cabinNumber'])
	const deckObj = {}
	deckList.forEach(({ deck }) => {
		deckObj[deck] = data.filter((d) => d.deck === deck)
	})

	return deckObj
}

export const getPeerGroupList = async (
	shipId,
	sailingDate,
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
	peerGroupBookedOccupancy,
	peerGroupBookingType,
	peerGroupCabinCategory,
	peerGroupCabinClassRate,
	peerGroupChannel,
	peerGroupPointOfSaleMarket,
	peerGroupRateCategory,
	snapshotLimit
) => {
	if (!shipId || !sailingDate || interval === null) return {}
	const date = moment(sailingDate)
	const date0 = moment(sailingDate).subtract(1, 'month')
	const date1 = moment(sailingDate).add(1, 'month')
	const selectedAvailableQuery = Cabin.query()
		.skipUndefined()
		.sum('c.cabinCapacity')
		.alias('c')
		.leftJoin(`snapshot_${date.format('YYYY_MM')} as s`, 'c.id', 's.cabinId')
		.where('c.shipId', shipId)
		.andWhere('c.cabinCategoryClassId', ref('cc.id'))
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
		.leftJoin(`snapshot_${date.format('YYYY_MM')} as s`, 'c.id', 's.cabinId')
		.where('c.shipId', shipId)
		.andWhere('c.cabinCategoryClassId', ref('cc.id'))
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
		.leftJoin(`snapshot_${date.format('YYYY_MM')} as s`, 'c.id', 's.cabinId')
		.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
		.whereIn('c.shipId', peerGroupShipIds)
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
		.leftJoin(`snapshot_${date.format('YYYY_MM')} as s`, 'c.id', 's.cabinId')
		.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
		.whereIn('c.shipId', peerGroupShipIds)
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
	const select = [
		'cc.id as id',
		'cc.cabinCategoryClass as category',
		selectedAvailableQuery,
		selectedBookedQuery,
		peerGroupAvailableQuery,
		peerGroupBookedQuery
	]
	if (date0.diff(moment([snapshotLimit.minYear, snapshotLimit.month])) >= 0) {
		select.push(
			...[
				Cabin.query()
					.skipUndefined()
					.sum('c.cabinCapacity')
					.alias('c')
					.leftJoin(
						`snapshot_${date0.format('YYYY_MM')} as s`,
						'c.id',
						's.cabinId'
					)
					.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
					.whereIn('c.shipId', peerGroupShipIds)
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
					.as('peerGroupAvailable1'),
				Cabin.query()
					.skipUndefined()
					.sum('s.bookedOccupancy')
					.alias('c')
					.leftJoin(
						`snapshot_${date0.format('YYYY_MM')} as s`,
						'c.id',
						's.cabinId'
					)
					.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
					.whereIn('c.shipId', peerGroupShipIds)
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
					.as('peerGroupBooked1')
			]
		)
	}
	if (date1.diff(moment([snapshotLimit.maxYear, snapshotLimit.month])) <= 0) {
		select.push(
			...[
				Cabin.query()
					.skipUndefined()
					.sum('c.cabinCapacity')
					.alias('c')
					.leftJoin(
						`snapshot_${date1.format('YYYY_MM')} as s`,
						'c.id',
						's.cabinId'
					)
					.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
					.whereIn('c.shipId', peerGroupShipIds)
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
					.as('peerGroupAvailable2'),
				Cabin.query()
					.skipUndefined()
					.sum('s.bookedOccupancy')
					.alias('c')
					.leftJoin(
						`snapshot_${date1.format('YYYY_MM')} as s`,
						'c.id',
						's.cabinId'
					)
					.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
					.whereIn('c.shipId', peerGroupShipIds)
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
					.as('peerGroupBooked2')
			]
		)
	}
	const cabinCategoryList = await CabinCategoryClass.query()
		.alias('cc')
		.skipUndefined()
		.whereIn('cc.id', cabinCategoryClass)
		.select(select)
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
		.leftJoin(`snapshot_${date.format('YYYY_MM')} as s`, function () {
			this.on('c.id', '=', 's.cabinId')
				.skipUndefined()
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
	cabinCategoryList.forEach((categoryClass) => {
		const {
			id,
			category,
			selectedAvailable,
			selectedBooked,
			peerGroupAvailable,
			peerGroupAvailable1 = 0,
			peerGroupAvailable2 = 0,
			peerGroupBooked,
			peerGroupBooked1 = 0,
			peerGroupBooked2 = 0
		} = categoryClass
		const selectedPercent = (
			(+selectedBooked / +selectedAvailable) *
			100
		).toFixed(2)
		const peerGroupPercent = (
			((+peerGroupBooked + +peerGroupBooked1 + +peerGroupBooked2) /
				(+peerGroupAvailable + +peerGroupAvailable1 + +peerGroupAvailable2)) *
			100
		).toFixed(2)
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
			.filter((d) => d.deck === deck)
			.map((cabin) => ({
				...cabin,
				...cabinCategoryObj[cabin.cabinCategoryClassId]
			}))
	})
	return deckObj
}

export const getItineraryIdList = async (itineraryId) => {
	if (!itineraryId) return undefined
	const itinerary = await Itinerary.query().findById(itineraryId)
	const itineraryList = await Itinerary.query().where(
		'itineraryDesc',
		itinerary.itineraryDesc
	)
	return itineraryList.map((i) => i.id)
}
