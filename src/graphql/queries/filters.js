import gql from 'graphql-tag'

export const GET_PRODUCT_LIST = gql`
  {
    productList {
      id
      name
    }
  }
`

export const GET_SHIP_LIST = gql`
  query shipList($id: Int) {
    shipList(id: $id) {
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
