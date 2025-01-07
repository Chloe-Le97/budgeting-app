import { Button, Form, Input, Select } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import { useCreateBudgetMutation } from './budgetDataProvider';

const BudgetForm = () => {
  const [formBudget] = Form.useForm();

  const { createBudget } = useCreateBudgetMutation();

  const addBudget = async (values) => {
    const budget = values.budget;
    await createBudget({ budget });
    formBudget.resetFields();
  };

  return (
    <div>
      <Form name="basic" onFinish={addBudget} form={formBudget}>
        <Form.Item name="budget" label="Monthly budget">
          <Input type="number" />
        </Form.Item>
        <div className="flex justify-end mt-9">
          <Button type="primary" htmlType="submit" className="">
            Add Budget
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BudgetForm;
