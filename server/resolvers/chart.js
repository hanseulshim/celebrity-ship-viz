import moment from 'moment'
import { ref } from 'objection'
import {
	BurndownGlobal,
	Cabin,
	CabinCategoryClass,
	SnapshotInterval
} from '../models'
import { getItineraryIdList } from './helper'

export default {
	Query: {
		cabinCategoryClassChart: async (_, { shipId, sailingDate, interval }) => {
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
				.leftJoin(
					`snapshot_${moment(sailingDate).format('YYYY_MM')} as s`,
					function () {
						this.on('c.id', '=', 's.cabinId')
							.skipUndefined()
							.andOn('s.interval', '=', interval)
							.andOn('c.cabinCategoryClassId', '=', 'cc.id')
					}
				)
				.where('c.shipId', shipId)
				.as('booked')
			const cabinCategoryList = await CabinCategoryClass.query()
				.alias('cc')
				.select([
					'cc.cabinCategoryClass as category',
					availableQuery,
					bookedQuery
				])

			const obj = {
				bookedX: [],
				availableX: [],
				y: []
			}

			cabinCategoryList.forEach((cabinCategory) => {
				obj.bookedX.push(cabinCategory.booked)
				obj.availableX.push(cabinCategory.available)
				obj.y.push(cabinCategory.category)
			})

			return obj
		},
		deckChart: async (_, { shipId, sailingDate, interval }) => {
			const deckList = await Cabin.query()
				.skipUndefined()
				.alias('c')
				.select('c.deck')
				.sum('c.cabinCapacity as available')
				.sum('s.bookedOccupancy as booked')
				.leftJoin(
					`snapshot_${moment(sailingDate).format('YYYY_MM')} as s`,
					'c.id',
					's.cabinId'
				)
				.where('c.shipId', shipId)
				.andWhere('s.interval', interval)
				.groupBy('c.deck')
				.orderBy('c.deck')

			const obj = {
				bookedX: [],
				availableX: [],
				y: []
			}

			deckList.forEach((deck) => {
				const percent = deck.available
					? Math.round((deck.booked / deck.available) * 100)
					: deck.booked
					? 100
					: 0
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
				sailingDate,
				productId,
				itineraryId,
				bookedOccupancy,
				bookingType,
				cabinCategory,
				cabinCategoryClass,
				cabinClassRate,
				channel,
				pointOfSaleMarket,
				rateCategory,
				peerGroupShipIds = [],
				peerGroupProductId,
				peerGroupBookedOccupancy,
				peerGroupCabinCategoryClass,
				peerGroupBookingType,
				peerGroupCabinCategory,
				peerGroupCabinClassRate,
				peerGroupChannel,
				peerGroupPointOfSaleMarket,
				peerGroupRateCategory
			},
			{ snapshotLimit }
		) => {
			if (!shipId || !sailingDate) return {}
			const date = moment(sailingDate)
			const date0 = moment(sailingDate).subtract(1, 'month')
			const date1 = moment(sailingDate).add(1, 'month')
			const itineraryIdList = await getItineraryIdList(itineraryId)
			const selectedAvailableQuery = Cabin.query()
				.skipUndefined()
				.sum('c.cabinCapacity')
				.alias('c')
				.leftJoin(
					`snapshot_${date.format('YYYY_MM')} as s`,
					'c.id',
					's.cabinId'
				)
				.where('c.shipId', shipId)
				.andWhere('s.interval', ref('i.interval'))
				.andWhere('s.productId', productId)
				.whereIn('s.itineraryId', itineraryIdList)
				.whereIn('c.cabinCategoryClassId', cabinCategoryClass)
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
				.leftJoin(
					`snapshot_${date.format('YYYY_MM')} as s`,
					'c.id',
					's.cabinId'
				)
				.where('c.shipId', shipId)
				.andWhere('s.interval', ref('i.interval'))
				.andWhere('s.productId', productId)
				.whereIn('s.itineraryId', itineraryIdList)
				.whereIn('c.cabinCategoryClassId', cabinCategoryClass)
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
				.leftJoin(
					`snapshot_${date.format('YYYY_MM')} as s`,
					'c.id',
					's.cabinId'
				)
				.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
				.whereIn('c.shipId', peerGroupShipIds)
				.andWhere('s.interval', ref('i.interval'))
				.andWhere('s.productId', peerGroupProductId)
				.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
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
				.leftJoin(
					`snapshot_${date.format('YYYY_MM')} as s`,
					'c.id',
					's.cabinId'
				)
				.leftJoin('sailingDate as sd', 'sd.id', 's.sailingDateId')
				.whereIn('c.shipId', peerGroupShipIds)
				.andWhere('s.interval', ref('i.interval'))
				.andWhere('s.productId', peerGroupProductId)
				.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
				.whereIn('s.bookedOccupancy', peerGroupBookedOccupancy)
				.whereIn('s.bookingType', peerGroupBookingType)
				.whereIn('c.cabinCategoryId', peerGroupCabinCategory)
				.whereIn('s.cabinClassRateId', peerGroupCabinClassRate)
				.whereIn('s.channelId', peerGroupChannel)
				.whereIn('s.marketId', peerGroupPointOfSaleMarket)
				.whereIn('s.rateCategoryId', peerGroupRateCategory)
				.as('peerGroupBooked')

			const select = peerGroupShipIds.length
				? [
						'i.interval',
						selectedAvailableQuery,
						selectedBookedQuery,
						peerGroupAvailableQuery,
						peerGroupBookedQuery
				  ]
				: ['i.interval', selectedAvailableQuery, selectedBookedQuery]
			if (
				date0.diff(moment([snapshotLimit.minYear, snapshotLimit.month])) >= 0
			) {
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
							.andWhere('s.interval', ref('i.interval'))
							.andWhere('s.productId', peerGroupProductId)
							.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
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
							.andWhere('s.interval', ref('i.interval'))
							.andWhere('s.productId', peerGroupProductId)
							.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
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
			if (
				date1.diff(moment([snapshotLimit.maxYear, snapshotLimit.month])) <= 0
			) {
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
							.andWhere('s.interval', ref('i.interval'))
							.andWhere('s.productId', peerGroupProductId)
							.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
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
							.andWhere('s.interval', ref('i.interval'))
							.andWhere('s.productId', peerGroupProductId)
							.whereIn('c.cabinCategoryClassId', peerGroupCabinCategoryClass)
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
			const selectedShipIntervals = await SnapshotInterval.query()
				.select(select)
				.alias('i')
				.orderBy('i.interval')

			const burndownGlobal = await BurndownGlobal.query()

			const selected = {
				x: [],
				y: []
			}
			const peerGroup = {
				x: [],
				y: []
			}
			const all = {
				x: [],
				y: []
			}

			burndownGlobal.forEach((point) => {
				all.x.push(point.interval)
				all.y.push(point.percentUnbooked)
			})

			selectedShipIntervals.forEach((snapshot) => {
				const {
					interval,
					selectedAvailable,
					selectedBooked,
					peerGroupAvailable,
					peerGroupAvailable1 = 0,
					peerGroupAvailable2 = 0,
					peerGroupBooked,
					peerGroupBooked1 = 0,
					peerGroupBooked2 = 0
				} = snapshot
				const selectedPercent = Math.round(
					(1 - +selectedBooked / +selectedAvailable) * 100
				)
				selected.x.push(+interval)
				selected.y.push(+selectedPercent)
				if (peerGroupShipIds.length) {
					const peerGroupPercent = Math.round(
						(1 -
							(+peerGroupBooked + +peerGroupBooked1 + +peerGroupBooked2) /
								(+peerGroupAvailable +
									+peerGroupAvailable1 +
									+peerGroupAvailable2)) *
							100
					)
					peerGroup.x.push(+interval)
					peerGroup.y.push(+peerGroupPercent)
				}
			})

			return {
				selected,
				all,
				peerGroup
			}
		}
	}
}
