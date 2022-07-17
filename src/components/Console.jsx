import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import './Console.css'

const Console = ({
  consoleText,
  onSubmit,
  config,
  waitingForInput,
  onReboot
}) => {

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (waitingForInput) {
      onSubmit(e.target[0].value);
    }
  }, [onSubmit, waitingForInput]);

  return (
    <form className="Console" onSubmit={handleSubmit}>
      <div>
        <pre>{consoleText}</pre>
        {waitingForInput && <div className="Console__input"><input type="text" autoFocus /></div>}
        <button
          onClick={onReboot}
          className="Console__rebootBtn"
          title="Reboot"
          type="button"
        >
        </button>
      </div>
    </form>
  )
}

Console.propTypes = {
  consoleText: PropTypes.string,
  onSubmit: PropTypes.func,
  config: PropTypes.object,
  waitingForInput: PropTypes.bool,
  onReboot: PropTypes.func
}

export default Console