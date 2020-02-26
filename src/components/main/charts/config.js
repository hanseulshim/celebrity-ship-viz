import colors from 'styles/colors'

export const supplyBurndownLayout = {
  width: 400,
  height: 250,
  hovermode: 'closest',
  margin: {
    l: 30,
    r: 0,
    t: 50,
    b: 30
  },
  title: {
    text: 'Supply Burndown',
    font: {
      color: colors.white,
      size: 19
    },
    x: 0,
    y: 1.1
  },
  showlegend: true,
  legend: {
    y: 1.3,
    x: 1,
    xanchor: 'right',
    orientation: 'h',
    font: {
      size: 9,
      color: colors.white
    }
  },
  paper_bgcolor: colors.black0,
  plot_bgcolor: colors.black0,
  xaxis: {
    showgrid: true,
    autorange: 'reversed',
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
}
