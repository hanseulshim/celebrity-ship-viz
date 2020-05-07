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
          selectedProduct: initialState.selectedProduct,
          selectedItinerary: initialState.selectedItinerary,
          selectedSailDate: initialState.selectedSailDate
        }
      case 'setSelectedProduct':
        return {
          ...state,
          selectedProduct: action.value,
          selectedItinerary: initialState.selectedItinerary,
          selectedSailDate: initialState.selectedSailDate
        }
      case 'setSelectedItinerary':
        return {
          ...state,
          selectedItinerary: action.value,
          selectedSailDate: initialState.selectedSailDate
        }
      case 'setSelectedSailDate':
        return {
          ...state,
          selectedSailDate: action.value
        }
      case 'setSelectedPeerShip':
        return {
          ...state,
          selectedPeerShip: action.value
        }
      case 'setSelectedPeerProduct':
        return {
          ...state,
          selectedPeerProduct: action.value
        }
      case 'setSelectedPeerSailingDates':
        return {
          ...state,
          selectedPeerSailingDates: action.value
        }
      case 'setSelectedSubFilter':
        return {
          ...state,
          filter: {
            ...state.filter,
            [action.title]: action.value
          }
        }
      case 'setSelectedPeerSubFilter':
        return {
          ...state,
          peerFilter: {
            ...state.peerFilter,
            [action.title]: action.value
          }
        }
      case 'setSelectedSubFilterCount':
        return {
          ...state,
          filterCount: {
            ...state.filterCount,
            [action.title]: action.value
          }
        }
      case 'setSelectedBookingWeek':
        return {
          ...state,
          selectedBookingWeek: action.value
        }
      case 'setSelectedDeck':
        return {
          ...state,
          selectedDeck: action.value
        }
      case 'setShipData':
        return {
          ...state,
          shipData: action.value
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
