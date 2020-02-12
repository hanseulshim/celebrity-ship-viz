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
            x: [1, 2, 3],
            y: [8, 6, 5],
            type: 'line',
            mode: 'lines',
            marker: { color: colors.lochmara }
          },
          {
            x: [1, 2, 3],
            y: [9, 5, 3],
            type: 'line',
            mode: 'lines',
            marker: { color: colors.white }
          }
        ]}
        layout={{
          width: 500,
          height: 400,
          title: {
            text: 'Supply Burndown',
            font: {
              color: colors.white
            },
            x: 0
          },
          legend: {
            y: 1.4,
            // x: 3,
            orientation: 'h'
          },
          paper_bgcolor: colors.black0,
          plot_bgcolor: colors.black0,
          xaxis: {
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.3)',
            showticklabels: false
          },
          yaxis: {
            showgrid: false
          }
        }}
      />
    </>
  )
}

export default SupplyBurndown
