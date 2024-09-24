import {
  faMoneyBillTransfer,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, Modal, Popconfirm, Tabs } from 'antd';
import * as R from 'ramda';
import React, { useMemo, useState } from 'react';

import category from '../../services/category';
import { iconObject } from '../../utils/iconMapping';
import { useGetAsset } from '../Assets/assetDataProvider';
import { useGetCategory } from '../Category/categoryDataProvider';
import ExpensesForm from './ExpensesForm';
import IncomeForm from './IncomeForm';
import TransferForm from './TransferForm';
import {
  useCreateExpenseMutation,
  useGetExpense,
  useRemoveExpenseMutation,
  useUpdateExpenseMutation,
} from './expenseDataProvider';

const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetExpense();
  const { data: dataAsset } = useGetAsset();
  const { data: dataCategory } = useGetCategory();

  const { updateExpense } = useUpdateExpenseMutation();
  const { removeExpense } = useRemoveExpenseMutation();

  const getDate = (expense) =>
    new Date(expense.createdAt).toISOString().split('T')[0];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const sortedData = useMemo(() => {
    if (!data) return null;

    console.log(data);

    // Step 1: Group expenses by transactionId
    const groupedByTransaction = R.groupBy(
      (expense) => expense.transactionId,
      data,
    );

    // Step 2: Combine expenses with the same transactionId
    const combinedExpenses = Object.values(groupedByTransaction).map(
      (group) => {
        if (group.length === 1) {
          return group[0];
        }
        const [transfer, receive] = group.sort((a, b) => a.money - b.money);
        return {
          id: transfer.id,
          transferAmount: receive.money,
          assetIdTransfer: transfer.assetId,
          assetIdReceived: receive.assetId,
          createdAt: transfer.createdAt,
          category: 'Transfer',
        };
      },
    );

    // Step 3: Group combined expenses by date
    const groupedByDate = R.groupBy(getDate, combinedExpenses);

    // Step 4: Sort grouped expenses by date (descending) and format date
    return Object.fromEntries(
      Object.entries(groupedByDate)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .map(([date, expenses]) => [formatDate(date), expenses]),
    );
  }, [data]);

  const getTotalMoneyByDate = (obj) => {
    // Does not calculate the transfer transaction
    const total = obj
      .filter((item) => item.category !== 'Transfer')
      .reduce((total, expense) => total + expense.money, 0);
    if (total > 0) {
      return '+' + total;
    } else {
      return total;
    }
  };

  const getCategoryIcon = (categoryId) => {
    const categoryIcon = dataCategory?.find(
      (category) => category.id === categoryId,
    );

    if (categoryIcon) {
      return categoryIcon.icon;
    }
  };

  const getAssetName = (assetId) => {
    const asset = dataAsset?.find((item) => item.asset_id === assetId);

    if (asset) {
      return asset.name;
    }
  };

  console.log(sortedData);

  const delExpense = async (id) => {
    await removeExpense({ id });
  };

  const edit = async (value) => {
    console.log(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tabItems = [
    {
      key: '1',
      label: 'Expense',
      children: <ExpensesForm handleOk={handleOk} />,
    },
    {
      key: '2',
      label: 'Income',
      children: <IncomeForm handleOk={handleOk} />,
    },
    {
      key: '3',
      label: 'Transfer',
      children: <TransferForm handleOk={handleOk} />,
    },
  ];

  return (
    <div>
      {sortedData && (
        <div>
          {Object.entries(sortedData).map(([date, expenses]) => (
            <List
              key={date}
              header={
                <div className="flex justify-between text-gray-400 text-sm">
                  <div>{date}</div>
                  <div>{getTotalMoneyByDate(expenses)} €</div>
                </div>
              }
              itemLayout="horizontal"
              className="mb-4"
              dataSource={expenses}
              renderItem={(expense) => (
                <>
                  {expense.category === 'Transfer' ? (
                    <List.Item
                      key={expense.id}
                      className="flex justify-between items-center expense-list-item text-base"
                    >
                      <div className="flex gap-3 items-center">
                        {getAssetName(expense.assetIdTransfer)}
                        <FontAwesomeIcon
                          icon={faMoneyBillTransfer}
                          className="text-gray-500 text-lg "
                        />
                        {getAssetName(expense.assetIdReceived)}
                      </div>
                      <div>{expense.transferAmount} €</div>
                    </List.Item>
                  ) : (
                    <List.Item
                      key={expense.id}
                      className="flex justify-between items-center expense-list-item"
                    >
                      <div className="flex gap-5 items-center">
                        <div className="text-gray-500 text-lg expense-icon">
                          {iconObject[getCategoryIcon(expense.categoryId)]}
                        </div>
                        <div>
                          <div className="mb-2 text-base">{expense.text}</div>
                          <div className="text-gray-400 text-sm">
                            {getAssetName(expense.assetId)}
                          </div>
                        </div>
                      </div>
                      <div className="text-base">
                        {expense.money > 0 ? (
                          <span className="text-purple-700 ">
                            + {expense.money} €
                          </span>
                        ) : (
                          <span>{expense.money} €</span>
                        )}
                      </div>
                    </List.Item>
                  )}
                </>
              )}
            />
          ))}
        </div>
      )}
      <Button type="primary" onClick={showModal} className="modal-button">
        +
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Modal>
    </div>
  );
};

export default Expenses;
