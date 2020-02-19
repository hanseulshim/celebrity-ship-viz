import React from 'react'
import colors from 'styles/colors'
import Plot from 'react-plotly.js'

const CategoryClass = () => {
  return (
    <>
      <Plot
        data={[
          {
            x: [30, 110, 403, 890, 160, 520, 275],
            y: [
              'Aqua',
              'Concierge',
              'Inside',
              'Outside',
              'Suites',
              'Veranda',
              'GTY'
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
            x: [50, 20, 120, 100, 160, 60, 40],
            y: [
              'Aqua',
              'Concierge',
              'Inside',
              'Outside',
              'Suites',
              'Veranda',
              'GTY'
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
            l: 55,
            r: 0,
            t: 0,
            b: 30,
            pad: 5
          },
          title: {
            text: 'Category Class',
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

export default CategoryClass
