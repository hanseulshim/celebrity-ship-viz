import gql from 'graphql-tag'

export const GET_DATASET_LIST = gql`
  {
    datasetList {
      id
      name
    }
  }
`

export const GET_BOOKINGTYPE_LIST = gql`
  {
    bookingTypeList {
      id
      name
    }
  }
`

export const GET_PRODUCT_LIST = gql`
  {
    productList {
      id
      name
    }
  }
`

export const GET_SHIP_LIST = gql`
  {
    shipList {
      id
      name
    }
  }
`
