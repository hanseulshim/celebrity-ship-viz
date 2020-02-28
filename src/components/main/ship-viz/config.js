import colors from 'styles/colors'

export const hoverInfo = peerGroupFilters => ({
  hoverlabel: {
    bgcolor: colors.biscay,
    bordercolor: colors.jungleMist,
    font: {
      color: colors.white,
      size: 16
    }
  },
  hovertemplate:
    peerGroupFilters
      ? '   %{customdata.category}   <br />   Booked %{customdata.selectedPercent}%   <br />   Average %{customdata.peerGroupPercent}%   <br />   Difference %{customdata.difference}%   <br /><br /><extra></extra>'
      : '   Room %{customdata.cabinNumber}   <br />   %{customdata.status}   <br />   Max %{customdata.cabinCapacity}   <br />   Booked %{customdata.bookedOccupancy}   <br /><br /><extra></extra>'
})

export const layout = {
  margin: {
    l: 0,
    r: 0,
    t: 0,
    b: 0,
    pad: 0
  },
  scene: {
    xaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      showspikes: false
    },
    yaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      showspikes: false
    },
    zaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false,
      showspikes: false
    },
    aspectmode: 'manual',
    aspectratio: {
      x: 0.5,
      y: 1,
      z: 0.3
    },
    camera: { center: { x: 0, y: 0, z: 0 }, eye: { x: 0.35, y: 0.35, z: 0.2 } }
  },
  paper_bgcolor: colors.black0,
  plot_bgcolor: colors.black0
}
