import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { getDaysInMonthForYear, mod } from '../utils';


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
                    return { type: 'prev', date: daysInPrevMonth + lookup };
                }
                if (lookup > daysInTheMonth) {
                    return { type: 'next', date: lookup - daysInTheMonth };
                }
                return { type: 'current', date: lookup };
            });
            if (cells[0].type !== 'current' && cells[6].type !== 'current') {
                // remove full rows of dates from other weeks
                return false;
            }
            return cells;
        })
        return rows.filter(Boolean);
    }, [config, daysInTheMonth, daysInPrevMonth]);

  return (
    <div>
        month {month} has {daysInTheMonth} days
        <pre>{JSON.stringify(table, null, 2)}</pre>
    </div>
  )
}

CalendarPage.propTypes = {}

export default CalendarPage