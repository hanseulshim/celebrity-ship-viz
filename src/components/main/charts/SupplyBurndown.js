import React, { useState, useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import colors from 'styles/colors'
import Plot from 'react-plotly.js'

const SupplyBurndown = () => {
  const [plotData, setPlotdata] = useState([])
  const globalState = useContext(store)
  const { state } = globalState
  const {
    peerGroupFilters,
    selectedShip,
    selectedSailDate,
    selectedBookingWeek
  } = state

  // useEffect(() => {
  //   const decks = Object.keys(shipData)
  //   const coords = decks.map(deck =>
  //     createDeck(shipData[deck], parseInt(deck), selectedDeck)
  //   )
  //   setPlotdata(coords)
  // }, [selectedDeck, shipData])

  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [99, 81, 75, 61, 52, 46, 38, 29, 25, 21],
            type: 'line',
            mode: 'lines',
            name: `${selectedShip.shipName}`,
            marker: {
              color: colors.aquaForest
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: colors.aquaForest,
              bordercolor: colors.aquaForest,
              font: {
                color: colors.black,
                size: 14
              }
            },
            hovertemplate: '   %{y}%<extra></extra>'
          },
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [99, 85, 77, 64, 58, 49, 40, 32, 25, 15],
            type: 'line',
            mode: 'lines',
            name: 'All ships',
            marker: {
              color: colors.babyBlue
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: colors.babyBlue,
              bordercolor: colors.babyBlue,
              font: {
                color: colors.black,
                size: 14
              }
            },
            hovertemplate: '   %{y}%<extra></extra>'
          }
        ]}
        layout={{
          width: 400,
          height: 250,
          hovermode: 'closest',
          margin: {
            l: 25,
            r: 0,
            t: 5,
            b: 5
          },
          title: {
            text: 'Supply Burndown',
            font: {
              color: colors.white,
              size: 21
            },
            x: 0
          },
          legend: {
            y: 1.3,
            x: 1,
            xanchor: 'right',
            orientation: 'v',
            font: {
              size: 10,
              color: colors.white
            }
          },
          paper_bgcolor: colors.black0,
          plot_bgcolor: colors.black0,
          xaxis: {
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.3)',
            showticklabels: false
          },
          yaxis: {
            showgrid: false,
            zeroline: true,
            layout: {
              ticks: 'outside'
            },
            tickfont: {
              size: 8
            }
          }
        }}
        config={{ displayModeBar: false }}
      />
    </>
  )
}

export default SupplyBurndown
