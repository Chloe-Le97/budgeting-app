import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  Typography,
} from 'antd';
import * as R from 'ramda';
import React, { useState } from 'react';

import { useGetAsset } from '../Assets/assetDataProvider';
import {
  useCreateExpenseMutation,
  useGetExpense,
  useUpdateExpenseMutation,
} from './expenseDataProvider';

const Expenses = ({ user }) => {
  const [form] = Form.useForm();

  const [editForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: 10,
  });
  const isEditing = (record) => record.key === editingKey;

  const { data } = useGetExpense();
  const { data: dataAsset } = useGetAsset();

  const { createExpense } = useCreateExpenseMutation();
  const { updateExpense } = useUpdateExpenseMutation();

  const options = dataAsset?.map((asset) => ({
    value: asset.id,
    label: asset.name,
  }));

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
            {inputNode}
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
    const newObject = {
      money: formValue.value,
      text: formValue.description,
      category: formValue.category,
    };
    await updateExpense({ id: formValue.key, data: newObject });
    setEditingKey('');
  };

  const addExpense = async (values) => {
    const money = values.money;
    const text = values.text;
    const category = values.category;
    const assetId = values.asset;
    createExpense({ money, text, category, assetId });
    form.resetFields();
  };

  const getDate = (expense) =>
    new Date(expense.createdAt).toISOString().split('T')[0];

  let groupedExpenses;
  let dataTable = [];
  if (data) {
    const sortedExpenses = R.sort(
      R.comparator(
        (a, b) =>
          new Date(b.createdAt).toISOString().split('T')[0] -
          new Date(a.createdAt).toISOString().split('T')[0],
      ),
      data,
    );
    console.log(sortedExpenses);
    groupedExpenses = R.groupBy(getDate, sortedExpenses);
    console.log(groupedExpenses);

    Object.entries(groupedExpenses).map(([date, expenses]) => {
      expenses.map((expense) =>
        dataTable.push({
          key: expense.id,
          date: date,
          category: expense.category,
          description: expense.text,
          value: expense.money,
        }),
      );
    });
  }

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
      title: 'Date',
      width: '20%',
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
      title: 'Category',
      dataIndex: 'category',
      width: '20%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '10%',
      editable: true,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
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

  return (
    <div>
      <h1>Expenses</h1>
      <div>
        {groupedExpenses == null ? (
          <></>
        ) : (
          <div>
            {R.keys(groupedExpenses).map((key) => (
              <div key={key}>
                <h3>{key}</h3>
                {groupedExpenses[key].map((expense) => (
                  <div key={expense.id}>
                    <p>
                      {expense.text}: {expense.money}
                    </p>
                  </div>
                ))}
              </div>
            ))}
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
                }}
                onChange={handlePagination}
              />
            </Form>
          </div>
        )}
      </div>
      <Form name="basic" onFinish={addExpense} form={form}>
        <Form.Item name="money" label="Value">
          <Input />
        </Form.Item>
        <Form.Item name="text" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Input />
        </Form.Item>
        <Form.Item
          name="asset"
          label="Asset"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select an asset"
            options={options}
            allowClear
          ></Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add expense
        </Button>
      </Form>
    </div>
  );
};

export default Expenses;
