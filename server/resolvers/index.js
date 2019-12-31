const datasetList = [
  {
    id: 1,
    name: 'Absolute Bookings'
  },
  {
    id: 2,
    name: 'Temporary Bookings'
  },
  {
    id: 3,
    name: 'Other Bookings'
  }
]

const bookingTypeList = [
  {
    id: 1,
    name: 'Individal & Group'
  },
  {
    id: 2,
    name: 'Individual'
  },
  {
    id: 3,
    name: 'Group'
  }
]

const productList = [
  {
    id: 1,
    name: 'TRANSATL'
  },
  {
    id: 2,
    name: 'TRANSPAC'
  }
]

const shipList = [
  {
    id: 1,
    name: 'APEX'
  },
  {
    id: 2,
    name: 'BRAVO'
  }
]

export const resolvers = {
  Query: {
    datsetList: () => datasetList,
    bookingTypeList: () => bookingTypeList,
    productList: () => productList,
    shipList: () => shipList
  }
}
