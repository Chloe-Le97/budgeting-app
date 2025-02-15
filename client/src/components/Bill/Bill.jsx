import { Table } from 'antd';
import { Typography } from 'antd';
import { keys } from 'ramda';
import { useEffect, useMemo, useState } from 'react';

import { useGetBill } from './billDataProvider';

const { Title } = Typography;

const Bill = () => {
  const { data } = useGetBill();

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

  console.log(data);

  const dataTable = useMemo(
    () =>
      data?.[selectedYear]?.monthly.map((item) => ({
        key: Object.keys(item)[0],
        month: Object.keys(item)[0],
        income: item[Object.keys(item)].income,
        expense: item[Object.keys(item)].expense,
        balance:
          item[Object.keys(item)].income - item[Object.keys(item)].expense,
      })),
    [data, selectedYear],
  );

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
    },
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  return (
    <div>
      <Title level={2}>Bill</Title>
      <div className="my-6">
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
      <Table
        columns={columns}
        dataSource={dataTable}
        summary={() => {
          return (
            <>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {data?.[selectedYear]?.yearly.income}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {data?.[selectedYear]?.yearly.expense}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {data?.[selectedYear]?.yearly.income -
                  data?.[selectedYear]?.yearly.expense}
              </Table.Summary.Cell>
            </>
          );
        }}
      />
    </div>
  );
};

export default Bill;
