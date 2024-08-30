import { Button, Form, Input, Select } from 'antd';
import React from 'react';

import { useGetAsset } from '../Assets/assetDataProvider';
import { useCreateIncomeMutation } from './expenseDataProvider';

const IncomeForm = () => {
  const [formIncome] = Form.useForm();

  const { data: dataAsset } = useGetAsset();
  const { createIncome } = useCreateIncomeMutation();

  const options = dataAsset?.map((asset) => ({
    value: asset.asset_id,
    label: asset.name,
  }));

  const addIncome = async (values) => {
    const money = values.money;
    const text = values.text;
    const category = values.category;
    const assetId = values.asset;
    await createIncome({ money, text, category, assetId });
    formIncome.resetFields();
  };

  return (
    <div>
      <h2>Add income</h2>
      <Form name="income-form" onFinish={addIncome} form={formIncome}>
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
        <Button type="primary" htmlType="submit">
          Add income
        </Button>
      </Form>
    </div>
  );
};

export default IncomeForm;
