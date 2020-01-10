import gql from 'graphql-tag'

export const GET_SHIP_LIST = gql`
  {
    shipList {
      id
      name
    }
  }
`
export const GET_PRODUCT_LIST = gql`
  query productList($id: Int) {
    productList(id: $id) {
      id
      name
    }
  }
`

export const GET_ITINERARY_LIST = gql`
  query itineraryList($id: Int) {
    itineraryList(id: $id) {
      id
      name
    }
  }
`
