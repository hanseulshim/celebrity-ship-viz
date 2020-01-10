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
      case 'setSelectedProduct':
        return {
          ...state,
          selectedProduct: action.value,
          selectedShip: null,
          selectedItinerary: null
        }
      case 'setSelectedShip':
        return {
          ...state,
          selectedShip: action.value,
          selectedItinerary: null
        }
      case 'setSelectedItinerary':
        return {
          ...state,
          selectedItinerary: action.value
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
