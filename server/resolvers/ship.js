import {
	Ship,
	Product,
	Itinerary,
	SailingDate,
	SnapshotInterval
} from '../models'
import { EDGE } from '../constants'
import moment from 'moment'

export default {
	Query: {
		shipList: async () => {
			const shipList = await Ship.query()
				.select('ship.*', 'class.name as className')
				.joinRelated('class')
				.orderBy('ship.id')
			return shipList.map((ship) => ({
				...ship,
				shipName: ship.shipName.replace('CELEBRITY ', '')
			}))
		},
		productList: async (_, { shipId }) => {
			if (!shipId) return []
			return Product.query()
				.skipUndefined()
				.joinRelated('ships')
				.where('ships.id', shipId)
		},
		peerGroupProductList: async (_, { shipIdList }) => {
			if (!shipIdList) return []
			return Product.query()
				.skipUndefined()
				.joinRelated('ships')
				.whereIn('ships.id', shipIdList)
		},
		itineraryList: async (_, { shipId, productId }) => {
			if (!shipId) return []
			return Itinerary.query()
				.skipUndefined()
				.leftJoinRelated('[ships, products]')
				.where('ships.id', shipId)
				.andWhere('products.id', productId)
		},
		sailingDateList: async (_, { shipId, productId, itineraryId }) => {
			if (!shipId) return []
			const sailingDateList = await SailingDate.query()
				.alias('d')
				.distinct('d.id', 'd.sailingDate')
				.skipUndefined()
				.leftJoinRelated('[ships, products, itineraries]')
				.where('ships.id', shipId)
				.andWhere('products.id', productId)
				.andWhere('itineraries.id', itineraryId)
				.orderBy('d.sailingDate', 'DESC')
			sailingDateList.forEach((sailingDate) => {
				sailingDate.sailingDate = moment.utc(sailingDate.sailingDate).format()
			})
			return sailingDateList
		},
		snapshotIntervalList: () =>
			SnapshotInterval.query().orderBy('interval', 'desc'),
		firstSailDate: async () => {
			const sailingDate = await SailingDate.query()
				.alias('d')
				.leftJoinRelated('ships')
				.orderBy('d.sailingDate')
				.findOne('ships.id', EDGE)
				.where('d.sailingDate', '>=', moment())
			sailingDate.sailingDate = moment.utc(sailingDate.sailingDate).format()
			const ship = await Ship.query()
				.select('ship.*', 'class.name as className')
				.joinRelated('class')
				.findById(EDGE)
			ship.shipName = ship.shipName.replace('CELEBRITY ', '')
			if (!sailingDate) {
				return {
					ship,
					sailingDate: null,
					interval: 0
				}
			}
			const diff = moment(sailingDate.sailingDate).diff(moment(), 'weeks')
			const interval = diff <= 0 ? 0 : diff
			return {
				ship,
				sailingDate,
				interval
			}
		}
	}
}
