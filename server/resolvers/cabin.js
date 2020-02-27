import { Cabin } from '../models'
import { getSelectedShipList, getPeerGroupList } from './helper'

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
        peerGroupShipIds,
        peerGroupProductId,
        peerGroupStartDate,
        peerGroupEndDate,
        peerGroupBookedOccupancy,
        peerGroupBookingType,
        peerGroupCabinCategory,
        peerGroupCabinClassRate,
        peerGroupChannel,
        peerGroupPointOfSaleMarket,
        peerGroupRateCategory
      }
    ) => {
      return !peerGroupShipIds ? getSelectedShipList(shipId,
        sailingDateId,
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
        rateCategory)
        : getPeerGroupList(
          shipId,
          sailingDateId,
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
          peerGroupShipIds,
          peerGroupProductId,
          peerGroupStartDate,
          peerGroupEndDate,
          peerGroupBookedOccupancy,
          peerGroupBookingType,
          peerGroupCabinCategory,
          peerGroupCabinClassRate,
          peerGroupChannel,
          peerGroupPointOfSaleMarket,
          peerGroupRateCategory
        )
    }
  }
}
