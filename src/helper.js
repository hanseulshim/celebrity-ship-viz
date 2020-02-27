export const getApi = () => {
  const REACT_APP_STAGE = process.env.REACT_APP_STAGE
  return REACT_APP_STAGE === 'dev'
    ? 'https://enfqba1qe0.execute-api.us-east-2.amazonaws.com/dev/graphql'
    : REACT_APP_STAGE === 'alpha'
    ? 'https://wgn6mdwplf.execute-api.us-east-2.amazonaws.com/alpha/graphql'
    : REACT_APP_STAGE === 'beta'
    ? 'https://5rrwqnuc98.execute-api.us-east-2.amazonaws.com/beta/graphql'
    : REACT_APP_STAGE === 'prod'
    ? 'https://jfkbhc8dbl.execute-api.us-east-2.amazonaws.com/prod/graphql'
    : 'http://localhost:4000/graphql'
}

export const getFilterVariables = (
  shipId,
  sailingDateId,
  interval,
  productId,
  itineraryId,
  peerGroupShipIds,
  peerGroupProductId,
  peerGroupStartDate,
  peerGroupEndDate,
  filter = {},
  peerFilter = {},
  filterCount = {}
) => {
  const variables = {
    shipId,
    sailingDateId,
    interval,
    productId,
    itineraryId,
    peerGroupShipIds,
    peerGroupProductId,
    peerGroupStartDate,
    peerGroupEndDate
  }
  Object.keys(filter)
    .filter(key => {
      return filter[key].length !== filterCount[key]
    })
    .forEach(key => {
      const filterKey =
        key === 'bookedOccupancy' || key === 'bookingType' ? 'value' : 'id'
      const arr = filter[key].map(v => v[filterKey])
      variables[key] = arr
    })
  Object.keys(peerFilter)
    .filter(key => {
      return peerFilter[key].length !== filterCount[key]
    })
    .forEach(key => {
      const filterKey =
        key === 'bookedOccupancy' || key === 'bookingType' ? 'value' : 'id'
      const arr = peerFilter[key].map(v => v[filterKey])
      const variableName =
        key === 'bookedOccupancy'
          ? 'peerGroupBookedOccupancy'
          : key === 'bookingType'
          ? 'peerGroupBookingType'
          : key === 'cabinCategory'
          ? 'peerGroupCabinCategory'
          : key === 'cabinCategoryClass'
          ? 'peerGroupCabinCategoryClass'
          : key === 'cabinClassRate'
          ? 'peerGroupCabinClassRate'
          : key === 'channel'
          ? 'peerGroupChannel'
          : key === 'pointOfSaleMarket'
          ? 'peerGroupPointOfSaleMarket'
          : 'peerGroupRateCategory'

      variables[variableName] = arr
    })

  return variables
}
