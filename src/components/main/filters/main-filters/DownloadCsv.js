import React, { useContext, useEffect, useState } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { CSVLink } from 'react-csv'
import Icon from 'components/common/Icon'

const Download = styled(CSVLink)`
  background-color: #80cbc4;
  margin-left: auto;
  color: ${props => props.theme.black};
  padding: 0.5em 2em;
  border-radius: 3px;
`

const DownloadCsv = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { shipData, peerGroupFilters } = state
  const [data, setData] = useState([])

  useEffect(() => {
    const decks = Object.keys(shipData)
    const csv = decks.map(deck => shipData[deck])
    setData(csv.flat())
  }, [shipData])

  const getheaders = peerGroupFilters => {
    if (!peerGroupFilters) {
      return [
        { label: 'Cabin Number', key: 'cabinNumber' },
        { label: 'Deck', key: 'deck' },
        { label: 'Booking Status', key: 'bookingStatus' },
        { label: 'Cabin Capacity', key: 'cabinCapacity' },
        { label: 'Booked Occupancy', key: 'bookedOccupancy' }
      ]
    } else {
      return [
        { label: 'Cabin Number', key: 'cabinNumber' },
        { label: 'Deck', key: 'deck' },
        { label: 'Booking Status', key: 'bookingStatus' },
        { label: 'Cabin Capacity', key: 'cabinCapacity' },
        { label: 'Booked Occupancy', key: 'bookedOccupancy' },
        { label: 'Category', key: 'category' },
        { label: 'Selected Percent', key: 'selectedPercent' },
        { label: 'Peer Group Percent', key: 'peerGroupPercent' },
        { label: 'Difference', key: 'difference' }
      ]
    }
  }

  if (!data.length) return null

  return (
    <Download
      data={data}
      headers={getheaders(peerGroupFilters)}
      filename={'shipData.csv'}
    >
      <Icon icon="download" />
      Download CSV
    </Download>
  )
}

export default DownloadCsv
