import { useQuery } from '@apollo/client'
// Project Components
import FilterSelect from 'components/common/FilterSelect'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import { store } from 'context/store'
// GQL
import { GET_PEER_GROUP_PRODUCT_LIST } from 'graphql/queries'
import React, { useContext } from 'react'

const SelectPeerProduct = () => {
	const globalState = useContext(store)
	const { state, dispatch } = globalState
	const { selectedPeerShip, selectedPeerProduct } = state
	const { loading, error, data } = useQuery(GET_PEER_GROUP_PRODUCT_LIST, {
		variables: {
			shipIdList: selectedPeerShip
		},
		fetchPolicy: 'network-only'
	})

	const onChange = (id) => {
		const product = data.peerGroupProductList.find(
			(product) => product.id === id
		)
		dispatch({ type: 'setSelectedPeerProduct', value: product })
	}

	if (loading) return <Loader />
	if (error) return <Notification type="error" message={error.message} />
	return (
		<FilterSelect
			label="Product(s)"
			displayKey="rdssProductCode"
			options={data.peerGroupProductList}
			value={selectedPeerProduct.id}
			onChange={onChange}
		/>
	)
}

export default SelectPeerProduct
