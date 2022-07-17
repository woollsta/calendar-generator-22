import React from 'react'
import PropTypes from 'prop-types'
import CalendarPage from './CalendarPage';
import './Calendar.css'

const months = Array(12).fill().map((v, i) => i + 1);

const Calendar = ({
  config
}) => {
  return (
    <div className="Calendar">
      <header>
        <h1>{config.year} Year Calendar</h1>
        <h2>{config.caption}</h2>
      </header>
      <main>
        {months.map((monthIndex) => (
          <CalendarPage
            key={monthIndex}
            month={monthIndex}
            config={config}
          />
        ))}
      </main>
    </div>
  )
}

Calendar.propTypes = {}

export default Calendar