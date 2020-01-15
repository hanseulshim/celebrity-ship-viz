export default `
extend type Query {
 peerShipList: [Ship]
 peerProductList(shipId: Int): [Product]
}
`
