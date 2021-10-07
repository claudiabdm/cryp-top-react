import './BaseLoadingSpinner.scss';

interface Props {
  size?: number | string
}

function BaseLoadingSpinner({size = 60}: Props) {
  return (
    <svg
    className="svg"
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Loading spinner</title>
    <circle cx="30" cy="30" r="25" stroke="#eee" />
    <g className="rotate">
      <circle className="circle" cx="30" cy="30" r="25" stroke="currentColor" />
    </g>
  </svg>
  )
}

export default BaseLoadingSpinner;