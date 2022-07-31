import React from 'react'
import PropTypes from 'prop-types'
import './PrintControls.css';

const PrintControls = ({
    onReboot
}) => {
  return (
    <div className='PrintControls'>
        <button className='PrintControls__printBtn' onClick={() => window.print()}>
            🖨️ Print
        </button>
        <button className='PrintControls__backBtn' onClick={onReboot}>
            🔃 Back
        </button>
    </div>
  )
}

PrintControls.propTypes = {
    onReboot: PropTypes.func
}

export default PrintControls