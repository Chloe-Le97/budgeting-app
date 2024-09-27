import { Button, Form, Input, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import { iconObject } from '../../utils/iconMapping';
import { useGetAsset } from '../Assets/assetDataProvider';
import { useGetCategory } from '../Category/categoryDataProvider';
import { useCreateExpenseMutation } from './expenseDataProvider';

const ExpensesForm = ({ handleOk }) => {
  const [formExpense] = Form.useForm();

  const { data: dataAsset } = useGetAsset();
  const { data: dataCategory } = useGetCategory();
  const { createExpense } = useCreateExpenseMutation();

  const categories = dataCategory
    ?.filter((item) => item.type === 'Expenses')
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

  const addExpense = async (values) => {
    const money = values.money;
    const text = values.text;
    const category = values.category;
    const assetId = values.asset;
    const categoryId = values.icon;
    await createExpense({ money, text, category, assetId, categoryId });
    formExpense.resetFields();
    handleOk();
  };

  return (
    <div>
      <Form name="basic" onFinish={addExpense} form={formExpense}>
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
          <Button type="primary" htmlType="submit" className="">
            Add expense
          </Button>
        </div>
      </Form>
    </div>
  );
};

ExpensesForm.propTypes = {
  handleOk: PropTypes.func,
};

ExpensesForm.defaultProps = {
  handleOk: () => {},
};

export default ExpensesForm;
