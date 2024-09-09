import { Button, Form, Input, Select } from 'antd';
import React from 'react';

import { useGetAsset } from '../Assets/assetDataProvider';
import { useCreateExpenseMutation } from './expenseDataProvider';

const ExpensesForm = () => {
  const [formExpense] = Form.useForm();

  const { data: dataAsset } = useGetAsset();
  const { createExpense } = useCreateExpenseMutation();

  const options = dataAsset?.map((asset) => ({
    value: asset.asset_id,
    label: asset.name,
  }));

  const addExpense = async (values) => {
    const money = values.money;
    const text = values.text;
    const category = values.category;
    const assetId = values.asset;
    await createExpense({ money, text, category, assetId });
    formExpense.resetFields();
  };

  return (
    <div>
      <Form name="basic" onFinish={addExpense} form={formExpense}>
        <Form.Item name="money" label="Value">
          <Input type="number" />
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
        <div className="flex justify-end mt-9">
          <Button type="primary" htmlType="submit" className="">
            Add expense
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ExpensesForm;
