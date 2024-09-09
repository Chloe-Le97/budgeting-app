import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tabs,
  Typography,
} from 'antd';
import * as R from 'ramda';
import React, { useState } from 'react';

import { useGetAsset } from '../Assets/assetDataProvider';
import ExpensesForm from './ExpensesForm';
import IncomeForm from './IncomeForm';
import {
  useCreateExpenseMutation,
  useGetExpense,
  useRemoveExpenseMutation,
  useUpdateExpenseMutation,
} from './expenseDataProvider';

const Expenses = ({ user }) => {
  const [editForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditing = (record) => record.key === editingKey;

  const { data } = useGetExpense();
  const { data: dataAsset } = useGetAsset();

  const { createExpense } = useCreateExpenseMutation();
  const { updateExpense } = useUpdateExpenseMutation();
  const { removeExpense } = useRemoveExpenseMutation();

  const optionsEdit = dataAsset?.map((asset) => ({
    value: asset.asset_id,
    label: asset.name,
  }));

  const getDate = (expense) =>
    new Date(expense.createdAt).toISOString().split('T')[0];

  let groupedExpenses;
  let dataTable = [];
  if (data) {
    groupedExpenses = R.groupBy(getDate, data);
    const sortedData = Object.fromEntries(
      Object.entries(groupedExpenses).sort(
        (a, b) => new Date(b[0]) - new Date(a[0]),
      ),
    );

    Object.entries(sortedData).map(([date, expenses]) => {
      expenses.map((expense) =>
        dataTable.push({
          key: expense.id,
          date: date,
          category: expense.category,
          description: expense.text,
          value: expense.money,
          asset: expense.assetId,
        }),
      );
    });
  }

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    const selectNode = (
      <Select
        placeholder="Select an asset"
        options={optionsEdit}
        allowClear
      ></Select>
    );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {dataIndex == 'asset' ? selectNode : inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    console.log(record);
    editForm.setFieldsValue({
      value: '',
      description: '',
      category: '',
      asset: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (value) => {
    console.log(editForm.getFieldValue());
    const formValue = editForm.getFieldValue();
    console.log(formValue);
    const newObject = {
      money: formValue.value,
      text: formValue.description,
      category: formValue.category,
      assetId: formValue.asset,
    };
    await updateExpense({ id: formValue.key, data: newObject });
    setEditingKey('');
  };

  const delExpense = async (id) => {
    await removeExpense({ id });
  };

  const getCountByDate = (date, obj) => {
    return obj[date] ? obj[date].length : 0;
  };

  const getTotalMoneyByDate = (date, obj) => {
    if (!obj[date]) return 0;

    return obj[date].reduce((total, expense) => total + expense.money, 0);
  };
  let sameKeyValue;

  const columns = [
    {
      title: () => {
        return <div className="text-center">Date</div>;
      },
      width: '18%',
      dataIndex: 'date',
      onCell: (record, index) => {
        if (record.date !== sameKeyValue) {
          const count = getCountByDate(record.date, groupedExpenses);

          sameKeyValue = record.date;
          if (index == paginationInfo.current * paginationInfo.pageSize + 1) {
            return { rowSpan: 0 };
          }
          return {
            rowSpan: count,
          };
        }
        return {
          rowSpan: 0,
        };
      },
      render: (date) => {
        const totalMoney = getTotalMoneyByDate(date, groupedExpenses);
        const dateStr = new Date(date);
        const dateText = dateStr.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        return (
          <div className="text-center">
            <div className="font-bold mb-3">{dateText}</div>
            <div>{totalMoney} €</div>
          </div>
        );
      },
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      width: '15%',
      editable: true,
      render: (value) => {
        const assetColumn = dataAsset?.find(
          (asset) => asset.asset_id === value,
        );
        return <div>{assetColumn?.name}</div>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '10%',
      editable: true,
      render: (value) => {
        if (value > 0) {
          return <div className="text-purple-700">+{value} €</div>;
        }
        return <div>{value} €</div>;
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      width: '5%',
      render: (_, value) => {
        const editable = isEditing(value);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(value)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(value)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      width: '5%',
      render: (_, value) => {
        return (
          <Popconfirm
            title="Delete the expense"
            description="Are you sure to delete this expense?"
            onConfirm={() => delExpense(value.key)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (value) => ({
        value,
        inputType: col.dataIndex === 'value' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(value),
      }),
    };
  });

  const handlePagination = (pagination) => {
    setPaginationInfo(pagination);
  };

  const tabItems = [
    {
      key: '1',
      label: 'Expense',
      children: <ExpensesForm />,
    },
    {
      key: '2',
      label: 'Income',
      children: <IncomeForm />,
    },
    {
      key: '3',
      label: 'Transfer',
      children: 'transfer form',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        {groupedExpenses == null ? (
          <></>
        ) : (
          <div>
            <Form form={editForm} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={dataTable}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  pageSize: 10,
                  position: ['bottomCenter'],
                }}
                onChange={handlePagination}
              />
            </Form>
          </div>
        )}
      </div>
      {/* <ExpensesForm />
      <IncomeForm /> */}
      <Button type="primary" onClick={showModal}>
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
