import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import './CalendarPageHeader.css';
import { Info } from 'luxon';

const CalendarPageHeader = ({ month, config }) => {
    const monthName = useMemo(() => (
        Info.months()[month - 1]
    ), [config.year, month]);
    return (
        <div className='CalendarPageHeader'>
            <div className='CalendarPageHeader__title'>
                {monthName}
            </div>
            <div className='CalendarPageHeader__days'>
                <div className='CalendarPageHeader__dayHeader'>M</div>
                <div className='CalendarPageHeader__dayHeader'>T</div>
                <div className='CalendarPageHeader__dayHeader'>W</div>
                <div className='CalendarPageHeader__dayHeader'>T</div>
                <div className='CalendarPageHeader__dayHeader'>F</div>
                <div className='CalendarPageHeader__dayHeader'>S</div>
                <div className='CalendarPageHeader__dayHeader'>S</div>
            </div>
        </div>
    )
}

CalendarPageHeader.propTypes = {}

export default CalendarPageHeader