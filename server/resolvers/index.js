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
    productList: () => productList,
    shipList: () => shipList
  }
}
