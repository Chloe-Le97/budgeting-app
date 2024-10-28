import { keys } from 'ramda';
import React, { useMemo, useState } from 'react';

import { useGetExpense } from '../Expenses/expenseDataProvider';

const Bill = () => {
  const { data } = useGetExpense();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate years from 1950 to the current year
  const years = [];
  for (let i = 1950; i <= currentYear; i++) {
    years.push(i);
  }

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <h2>Bill</h2>
      <div>
        <label htmlFor="year-select">Year: </label>
        <select id="year-select" value={selectedYear} onChange={handleChange}>
          <option value="">--Year--</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <h2>Monthly Totals for {selectedYear}</h2>
      <ul>
        {keys(monthlyTotals).map((month) => {
          return (
            <li key={month}>
              {month} : Income : {monthlyTotals[month].income} €; Expense :{' '}
              {monthlyTotals[month].expense}€
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Bill;
