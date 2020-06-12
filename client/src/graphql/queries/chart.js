import gql from 'graphql-tag'

export const GET_SUPPLY_BURNDOWN_CHART = gql`
	query supplyBurndownChart(
		$shipId: Int!
		$sailingDate: String!
		$productId: Int
		$itineraryId: Int
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
		$peerGroupCabinCategoryClass: [Int]
		$peerGroupCabinClassRate: [Int]
		$peerGroupChannel: [Int]
		$peerGroupPointOfSaleMarket: [Int]
		$peerGroupRateCategory: [Int]
	) {
		supplyBurndownChart(
			shipId: $shipId
			sailingDate: $sailingDate
			productId: $productId
			itineraryId: $itineraryId
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
			peerGroupCabinCategoryClass: $peerGroupCabinCategoryClass
			peerGroupCabinClassRate: $peerGroupCabinClassRate
			peerGroupChannel: $peerGroupChannel
			peerGroupPointOfSaleMarket: $peerGroupPointOfSaleMarket
			peerGroupRateCategory: $peerGroupRateCategory
		) {
			selected {
				x
				y
			}
			all {
				x
				y
			}
			peerGroup {
				x
				y
			}
		}
	}
`

export const GET_CABIN_CATEGORY_CLASS_CHART = gql`
	query cabinCategoryClassChart(
		$shipId: Int!
		$sailingDate: String!
		$interval: Int!
	) {
		cabinCategoryClassChart(
			shipId: $shipId
			sailingDate: $sailingDate
			interval: $interval
		) {
			bookedX
			availableX
			y
		}
	}
`

export const GET_DECK_CHART = gql`
	query deckChart($shipId: Int!, $sailingDate: String!, $interval: Int!) {
		deckChart(shipId: $shipId, sailingDate: $sailingDate, interval: $interval) {
			bookedX
			availableX
			y
		}
	}
`
