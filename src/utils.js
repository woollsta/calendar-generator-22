import { DateTime } from "luxon";

// Extended version of % with negative integer support.
export const mod = (n, m) => {
    const q = n % m;
  return q < 0 ? q + m : q;
}

export const getDaysInMonthForYear = (month, year) => {
    if (month === 1) return 31;
    if (month === 2) return DateTime.local(year).isInLeapYear ? 29 : 28;
    if (month === 3) return 31;
    if (month === 4) return 30;
    if (month === 5) return 31;
    if (month === 6) return 30;
    if (month === 7) return 31;
    if (month === 8) return 31;
    if (month === 9) return 30;
    if (month === 10) return 31;
    if (month === 11) return 30;
    if (month === 12) return 31;
};