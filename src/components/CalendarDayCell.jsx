import React from 'react'
import PropTypes from 'prop-types'
import './CalendarDayCell.css'
import clsx from 'clsx'

const CalendarDayCell = ({ type, date }) => {
  return (
    <div className={clsx('CalendarDayCell', `CalendarDayCell--${type}`)}>
      <span>{date}</span>
    </div>
  )
}

CalendarDayCell.propTypes = {}

export default CalendarDayCell