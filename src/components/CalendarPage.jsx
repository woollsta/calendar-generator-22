import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { getDaysInMonthForYear, mod } from '../utils';
import './CalendarPage.css';
import CalendarDayCell from './CalendarDayCell';
import CalendarPageHeader from './CalendarPageHeader';

const CalendarPage = ({
    config,
    month
}) => {
    const daysInPrevMonth = useMemo(() => getDaysInMonthForYear(
        mod(month - 2, 12) + 1,
        month === 1 ? config.year - 1 : config.year
    ), [month, config.year]);

    const daysInTheMonth = useMemo(() => getDaysInMonthForYear(month, config.year), [month, config.year]);

    const table = useMemo(() => {
        const dayOfWeekForFirstDay = DateTime.fromObject({ year: config.year, month, day: 1 }).weekday;
        const rows = Array(6).fill().map((v, rowIndex) => {
            const cells = Array(7).fill().map((cv, cellIndex) => {
                const lookup = ((rowIndex * 7) + cellIndex) - (dayOfWeekForFirstDay - 2);
                if (lookup < 1) {
                    return { id: cellIndex, type: 'prev', date: daysInPrevMonth + lookup };
                }
                if (lookup > daysInTheMonth) {
                    return { id: cellIndex, type: 'next', date: lookup - daysInTheMonth };
                }
                return { id: cellIndex, type: 'current', date: lookup };
            });
            if (cells[0].type !== 'current' && cells[6].type !== 'current') {
                // remove full rows of dates from other months
                return false;
            }
            return { id: rowIndex, cells };
        })
        return rows.filter(Boolean);
    }, [config, daysInTheMonth, daysInPrevMonth]);

  return (
    <div className='CalendarPage'>
        <CalendarPageHeader month={month} config={config} />
        <div className='CalendarPage__days'>
            {table.map(({ id, cells }) => (
                <div key={id} className='CalendarPage__row'>
                    {cells.map((cell) => (
                        <CalendarDayCell key={cell.id} {...cell} />
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

CalendarPage.propTypes = {}

export default CalendarPage