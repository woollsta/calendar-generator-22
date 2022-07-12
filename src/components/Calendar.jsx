import React from 'react'
import PropTypes from 'prop-types'
import CalendarPage from './CalendarPage';
const months = Array(12).fill().map((v, i) => i + 1);
const Calendar = ({
    config
}) => {
  return (
    <div>
        {months.map((monthIndex) => (
            <CalendarPage key={monthIndex} month={monthIndex} config={config} />
        ))}
    </div>
  )
}

Calendar.propTypes = {}

export default Calendar