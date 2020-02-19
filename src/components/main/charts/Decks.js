import React from 'react'
import colors from 'styles/colors'
import Plot from 'react-plotly.js'

const Decks = () => {
  return (
    <>
      <Plot
        data={[
          {
            x: [75, 80, 95, 99, 95, 80, 70, 80, 80, 95, 85],
            y: [
              'Deck 3',
              'Deck 4',
              'Deck 5',
              'Deck 6',
              'Deck 7',
              'Deck 8',
              'Deck 9',
              'Deck 10',
              'Deck 11',
              'Deck 12',
              'Deck 14'
            ],
            type: 'bar',
            orientation: 'h',
            name: 'Booked',
            marker: {
              color: colors.lochmara
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: colors.lochmara,
              bordercolor: colors.lochmara,
              font: {
                color: colors.black,
                size: 14
              }
            },
            hovertemplate: '   %{x}<extra></extra>'
          },
          {
            x: [25, 20, 5, 1, 5, 20, 30, 20, 20, 5, 15],
            y: [
              'Deck 3',
              'Deck 4',
              'Deck 5',
              'Deck 6',
              'Deck 7',
              'Deck 8',
              'Deck 9',
              'Deck 10',
              'Deck 11',
              'Deck 12',
              'Deck 14'
            ],
            type: 'bar',
            orientation: 'h',
            name: 'Available',
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
            hovertemplate: '   %{x}<extra></extra>'
          }
        ]}
        layout={{
          width: 450,
          height: 300,
          barmode: 'stack',
          hovermode: 'closest',
          margin: {
            l: 50,
            r: 0,
            t: 0,
            b: 30,
            pad: 5
          },
          title: {
            text: 'Decks',
            font: {
              color: colors.white,
              size: 21
            },
            x: 0
          },
          legend: {
            y: 1.2,
            x: 1,
            xanchor: 'right',
            orientation: 'h',
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
            layout: {
              ticks: 'outside'
            },
            tickfont: {
              size: 8,
              color: colors.white
            }
          },
          yaxis: {
            showgrid: false,
            zeroline: true,
            layout: {
              ticks: 'outside'
            },
            tickfont: {
              size: 10,
              color: colors.white
            }
          }
        }}
        config={{ displayModeBar: false }}
      />
    </>
  )
}

export default Decks
