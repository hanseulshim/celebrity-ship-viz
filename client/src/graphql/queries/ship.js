import gql from 'graphql-tag'

export const GET_VISUAL_DECK_LIST = gql`
	query deckVisualList(
		$shipId: Int
		$sailingDate: String
		$productId: Int
		$itineraryId: Int
		$interval: Int
		$bookedOccupancy: [String]
		$bookingType: [String]
		$cabinCategory: [Int]
		$cabinCategoryClass: [Int]
		$cabinClassRate: [Int]
		$channel: [Int]
		$pointOfSaleMarket: [Int]
		$rateCategory: [Int]
		$peerGroupShipIds: [Int]
		$peerGroupProductId: Int
		$peerGroupBookedOccupancy: [String]
		$peerGroupBookingType: [String]
		$peerGroupCabinCategory: [Int]
		$peerGroupCabinClassRate: [Int]
		$peerGroupChannel: [Int]
		$peerGroupPointOfSaleMarket: [Int]
		$peerGroupRateCategory: [Int]
	) {
		deckVisualList(
			shipId: $shipId
			sailingDate: $sailingDate
			productId: $productId
			itineraryId: $itineraryId
			interval: $interval
			bookedOccupancy: $bookedOccupancy
			bookingType: $bookingType
			cabinCategory: $cabinCategory
			cabinCategoryClass: $cabinCategoryClass
			cabinClassRate: $cabinClassRate
			channel: $channel
			pointOfSaleMarket: $pointOfSaleMarket
			rateCategory: $rateCategory
			peerGroupShipIds: $peerGroupShipIds
			peerGroupProductId: $peerGroupProductId
			peerGroupBookedOccupancy: $peerGroupBookedOccupancy
			peerGroupBookingType: $peerGroupBookingType
			peerGroupCabinCategory: $peerGroupCabinCategory
			peerGroupCabinClassRate: $peerGroupCabinClassRate
			peerGroupChannel: $peerGroupChannel
			peerGroupPointOfSaleMarket: $peerGroupPointOfSaleMarket
			peerGroupRateCategory: $peerGroupRateCategory
		)
	}
`
export const GET_FIRST_SAIL_DATE = gql`
	{
		firstSailDate {
			ship {
				id
				shipName
				shipCode
				classId
				className
			}
			sailingDate {
				id
				sailingDate
			}
			interval
		}
	}
`
