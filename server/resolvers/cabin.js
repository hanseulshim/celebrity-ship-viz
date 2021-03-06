import { Cabin } from '../models'
import {
	getItineraryIdList,
	getPeerGroupList,
	getSelectedShipList
} from './helper'

export default {
	Query: {
		deckList: async (_, { shipId }) => {
			if (!shipId) return []
			const deckList = await Cabin.query()
				.distinct('deck')
				.where('shipId', shipId)
				.orderBy('deck')
			return deckList.map((d) => d.deck)
		},
		deckVisualList: async (
			_,
			{
				shipId,
				sailingDate,
				productId,
				itineraryId,
				interval,
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
				peerGroupBookingType,
				peerGroupCabinCategory,
				peerGroupCabinClassRate,
				peerGroupChannel,
				peerGroupPointOfSaleMarket,
				peerGroupRateCategory
			},
			{ snapshotLimit }
		) => {
			const itineraryIdList = await getItineraryIdList(itineraryId)
			return !peerGroupShipIds.length
				? getSelectedShipList(
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
				  )
				: getPeerGroupList(
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
				  )
		}
	}
}
