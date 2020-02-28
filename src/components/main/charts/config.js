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
    y: 1.5,
    x: 1,
    xanchor: 'right',
    orientation: 'v',
    font: {
      size: 8,
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

export const categoryClassLayout = {
  width: 400,
  height: 250,
  barmode: 'stack',
  hovermode: 'closest',
  margin: {
    r: 0,
    l: 60,
    t: 0,
    b: 30,
    pad: 5
  },
  title: {
    text: 'Category Class',
    font: {
      color: colors.white,
      size: 19
    },
    x: 0
  },
  legend: {
    y: 1.2,
    x: 1,
    xanchor: 'right',
    orientation: 'h',
    traceorder: 'normal',
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
      size: 9,
      color: colors.white
    }
  }
}

export const deckLayout = {
  width: 400,
  height: 250,
  barmode: 'stack',
  hovermode: 'closest',
  margin: {
    r: 0,
    l: 60,
    t: 0,
    b: 30,
    pad: 5
  },
  title: {
    text: 'Decks',
    font: {
      color: colors.white,
      size: 19
    },
    x: 0
  },
  legend: {
    y: 1.2,
    x: 1,
    xanchor: 'right',
    orientation: 'h',
    traceorder: 'normal',
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
      size: 9,
      color: colors.white
    }
  }
}
