// store.js
import React, { createContext, useReducer } from 'react'

// initial state
import initialState from './initialState'

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'togglePeerGroupFilters':
        return {
          ...state,
          peerGroupFilters: !state.peerGroupFilters
        }
      case 'setSelectedShip':
        return {
          ...state,
          selectedShip: action.value,
          selectedProduct: null,
          selectedItinerary: null,
          selectedSailDate: null
        }
      case 'setSelectedProduct':
        return {
          ...state,
          selectedProduct: action.value,
          selectedItinerary: null,
          selectedSailDate: null
        }
      case 'setSelectedItinerary':
        return {
          ...state,
          selectedItinerary: action.value,
          selectedSailDate: null
        }
      case 'setSelectedSailDate':
        return {
          ...state,
          selectedSailDate: action.value
        }
      case 'setSelectedPeerProduct':
        return {
          ...state,
          selectedPeerProduct: action.value
        }
      case 'setSelectedPeerShip':
        return {
          ...state,
          selectedPeerShip: action.value
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
