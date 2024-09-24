import { Button, Form, Input, Radio, Select } from 'antd';
import React from 'react';

import { iconObject } from '../../utils/iconMapping';
import { useGetAsset } from '../Assets/assetDataProvider';
import { useGetCategory } from '../Category/categoryDataProvider';
import { useCreateIncomeMutation } from './expenseDataProvider';

const IncomeForm = ({ handleOk }) => {
  const [formIncome] = Form.useForm();

  const { data: dataAsset } = useGetAsset();
  const { data: dataCategory } = useGetCategory();
  const { createIncome } = useCreateIncomeMutation();

  const categories = dataCategory
    ?.filter((item) => item.type === 'Income')
    .sort((a, b) => a.id - b.id);

  const iconOptions = categories?.map((category) => ({
    value: category.id,
    label: (
      <div className="category-icon-add w-full flex flex-col justify-center">
        <div className="mb-0 icon">{iconObject[category.icon]}</div>
        <div className="category-name">{category.name}</div>
      </div>
    ),
  }));

  const options = dataAsset?.map((asset) => ({
    value: asset.asset_id,
    label: asset.name,
  }));

  const addIncome = async (values) => {
    const money = values.money;
    const text = values.text;
    const category = values.category;
    const assetId = values.asset;
    const categoryId = values.icon;
    await createIncome({ money, text, category, assetId, categoryId });
    formIncome.resetFields();
    handleOk();
  };

  return (
    <div>
      <Form
        name="income-form"
        onFinish={addIncome}
        form={formIncome}
        className="income-form"
      >
        <Form.Item
          name="icon"
          label=""
          className="mt-5"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group
            className="category-edit-icon-btn"
            options={iconOptions}
            allowClear
            optionType="button"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="money"
          label="Value"
          rules={[
            {
              required: true,
            },
          ]}
          className="mt-9"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="text" label="Description">
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
          <Button type="primary" htmlType="submit">
            Add income
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default IncomeForm;
