import React from 'react'
import styled from 'styled-components'
import colors from 'styles/colors'
import Plot from 'react-plotly.js'

const SupplyBurndown = () => {
  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [99, 81, 75, 61, 52, 46, 38, 29, 25, 21],
            type: 'line',
            mode: 'lines',
            marker: {
              color: colors.aquaForest
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: colors.aquaForest,
              bordercolor: colors.aquaForest,
              font: {
                color: colors.black,
                size: 12
              }
            },
            hovertemplate: '   %{y}%<extra></extra>'
          },
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [99, 85, 77, 64, 58, 49, 40, 32, 25, 15],
            type: 'line',
            mode: 'lines',
            marker: {
              color: colors.jungleMist
            },
            hoverinfo: 'text',
            hoverlabel: {
              bgcolor: colors.jungleMist,
              bordercolor: colors.jungleMist,
              font: {
                color: colors.black,
                size: 12
              }
            },
            hovertemplate: '   %{y}%<extra></extra>'
          }
        ]}
        layout={{
          hoverInfo: {
            hoverlabel: {
              bgcolor: colors.biscay,
              bordercolor: colors.jungleMist,
              font: {
                color: colors.white,
                size: 16
              }
            },
            hovertemplate: '   {y} %<extra></extra>'
          },
          width: 350,
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
              color: colors.white
            },
            x: 0
          },
          legend: {
            y: 1.2,
            x: 1,
            xanchor: 'right',
            orientation: 'h',
            font: {
              size: 8,
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
      />
    </>
  )
}

export default SupplyBurndown
