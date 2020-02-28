import React, { useContext, useEffect, useState } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import Icon from 'components/common/Icon'

const Download = styled.button`
  background-color: #80cbc4;
  margin-left: auto;
  color: ${props => props.theme.black};
  padding: 0.5em 2em;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`

const CsvDownload = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { shipData } = state
  const [data, setData] = useState([])

  useEffect(() => {
    const decks = Object.keys(shipData)
    const flatData = decks.map(deck => shipData[deck]).flat()

    const peerGroupData = flatData.length !== 0 && Object.prototype.hasOwnProperty.call(flatData[0], 'category')

    const data = flatData.map(row => {
      const obj = {
        deck: row.deck,
        cabinNumber: row.cabinNumber,
        bookingStatus: row.bookingStatus,
        cabinCapacity: row.cabinCapacity,
        bookedOccupancy: row.bookedOccupancy
      }
      if (peerGroupData) {
        obj.category = row.category
        obj.selectedPercent = row.selectedPercent
        obj.peerGroupPercent = row.peerGroupPercent
        obj.difference = row.difference
      }
      return obj
    })

    setData(data)
  }, [shipData])

  const generateCsv = () => {
    const csvRows = []
    const headers = Object.keys(data[0])
    csvRows.push(headers.map(header => `"${('' + header).replace(/"/g, '\\"')}"`).join(','))

    for (const row of data) {
      csvRows.push(headers.map(header => `"${('' + row[header]).replace(/"/g, '\\"')}"`).join(','))
    }

    const csvData = csvRows.join('\n')

    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'shipData.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (!data.length) return null

  return (
    <Download onClick={() => generateCsv()}>
      <Icon icon="download" />
      Download CSV
    </Download>
  )
}

export default CsvDownload
