import { Card, Select, Spin, Statistic, Table, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { useGetBill } from './billDataProvider';

const { Title } = Typography;

const Bill = () => {
  const { data, isLoading } = useGetBill();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate years from current year down to 2020 (or earlier if data exists)
  const availableYears = useMemo(() => {
    if (!data) return [currentYear];
    const yearsFromData = Object.keys(data).map(Number).sort((a, b) => b - a);
    const allYears = Array.from(
      new Set([...yearsFromData, currentYear]),
    ).sort((a, b) => b - a);
    return allYears.length > 0 ? allYears : [currentYear];
  }, [data, currentYear]);

  // Month names mapping
  const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  const dataTable = useMemo(() => {
    if (!data?.[selectedYear]?.monthly) return [];

    return data[selectedYear].monthly
      .map((item) => {
        const monthNum = parseInt(Object.keys(item)[0]);
        const monthData = item[monthNum];
        return {
          key: monthNum,
          month: monthNum,
          monthName: monthNames[monthNum] || `Month ${monthNum}`,
          income: monthData.income || 0,
          expense: monthData.expense || 0,
          balance: (monthData.income || 0) - (monthData.expense || 0),
        };
      })
      .sort((a, b) => a.month - b.month);
  }, [data, selectedYear]);

  const yearlyData = data?.[selectedYear]?.yearly;
  const yearlyBalance = yearlyData
    ? yearlyData.income - yearlyData.expense
    : 0;

  const columns = [
    {
      title: 'Month',
      dataIndex: 'monthName',
      key: 'month',
      width: '25%',
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
      width: '25%',
      align: 'right',
      render: (value) => (
        <span className="text-green-600 font-medium">{value} €</span>
      ),
    },
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
      width: '25%',
      align: 'right',
      render: (value) => (
        <span className="text-red-600 font-medium">{value} €</span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: '25%',
      align: 'right',
      render: (value) => (
        <span
          className={`font-semibold ${
            value >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {value >= 0 ? '+' : ''}
          {value} €
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div>
        <Title level={2}>Bill</Title>
        <div className="mt-6 p-8 text-center text-gray-500">
          <p>No financial data available yet.</p>
          <p className="mt-2 text-sm">
            Start adding income and expenses to see your bills here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Bill</Title>
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="font-medium">
            Year:
          </label>
          <Select
            id="year-select"
            value={selectedYear}
            onChange={setSelectedYear}
            style={{ width: 120 }}
            options={availableYears.map((year) => ({
              label: year,
              value: year,
            }))}
          />
        </div>
      </div>

      {/* Summary Cards */}
      {yearlyData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <Statistic
              title="Total Income"
              value={yearlyData.income}
              suffix="€"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
          <Card>
            <Statistic
              title="Total Expense"
              value={yearlyData.expense}
              suffix="€"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
          <Card>
            <Statistic
              title="Net Balance"
              value={yearlyBalance}
              suffix="€"
              valueStyle={{
                color: yearlyBalance >= 0 ? '#52c41a' : '#ff4d4f',
              }}
              prefix={yearlyBalance >= 0 ? '+' : ''}
            />
          </Card>
        </div>
      )}

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={false}
        locale={{
          emptyText: 'No data available for this year',
        }}
        summary={() => {
          if (!yearlyData) return null;
          return (
            <Table.Summary fixed>
              <Table.Summary.Row className="bg-gray-50 font-semibold">
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <span className="text-green-600">
                    {yearlyData.income} €
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">
                  <span className="text-red-600">
                    {yearlyData.expense} €
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">
                  <span
                    className={`font-semibold ${
                      yearlyBalance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {yearlyBalance >= 0 ? '+' : ''}
                    {yearlyBalance} €
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </div>
  );
};

export default Bill;
