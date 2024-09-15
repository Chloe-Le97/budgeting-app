import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Progress, Typography } from 'antd';
import React, { useState } from 'react';

import { useGetExpense } from '../Expenses/expenseDataProvider';
import BudgetForm from './BudgetForm';
import BudgetUpdateForm from './BudgetUpdateForm';
import {
  useCreateBudgetMutation,
  useGetBudget,
  useUpdateBudgetMutation,
} from './budgetDataProvider';

const Budget = () => {
  const { data: dataBudget } = useGetBudget();
  const { data: dataExpense } = useGetExpense();

  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonth];
  const currentYear = currentDate.getFullYear();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(dataExpense);

  // Calculate total expenses for the current month
  const currentMonthExpenses = dataExpense
    ?.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return (
        expense.money < 0 &&
        expense.category !== 'Transfer' &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + Math.abs(expense.money), 0);

  const remainPercent =
    (currentMonthExpenses / dataBudget?.monthlyBudget) * 100;

  let budgetStatus = '';
  let displayMessage = '';

  if (remainPercent > 100) {
    budgetStatus = 'exception';
    displayMessage = 'Overrun';
  } else {
    budgetStatus = '';
    displayMessage = Math.round(remainPercent * 10) / 10 + '%';
  }

  return (
    <div>
      {dataBudget?.monthlyBudget == null ? (
        <BudgetForm />
      ) : (
        <div>
          <Title level={3}>Budget</Title>
          <div className="flex justify-between">
            <div className="budget-month mt-3">{currentMonthName}</div>
            <div>
              <Button type="link" onClick={showModal}>
                <EditOutlined style={{ fontSize: '20px' }} />
              </Button>
            </div>
          </div>
          <Modal
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer=""
          >
            <BudgetUpdateForm handleOk={handleOk} />
          </Modal>
          <div className="flex justify-between mt-8">
            <div className="w-2/4">
              <Progress
                type="circle"
                percent={Math.round(remainPercent * 10) / 10}
                status={budgetStatus}
                format={() => displayMessage}
              />
            </div>
            <div className="w-2/4">
              <div className="flex justify-between items-center pb-3">
                <div className="budget-remain">Remaining:</div>
                <div className="budget-remain">
                  {dataBudget?.monthlyBudget - currentMonthExpenses} €
                </div>
              </div>
              <hr></hr>
              <div className="flex justify-between pt-3">
                <div>Budget:</div>
                <div>{dataBudget?.monthlyBudget} €</div>
              </div>
              <div className="flex justify-between mt-2">
                <div>Expense:</div>
                <div>{currentMonthExpenses} €</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
