import { Button, Form, Input } from 'antd';
import React from 'react';

import { useUpdateBudgetMutation } from './budgetDataProvider';

const BudgetUpdateForm = ({ handleOk }) => {
  const [formBudget] = Form.useForm();

  const { updateBudget } = useUpdateBudgetMutation();

  const changeBudget = async (values) => {
    const budget = values.budget;
    await updateBudget({ budget });
    formBudget.resetFields();
    handleOk();
  };

  return (
    <div className="pt-8">
      <Form name="basic" onFinish={changeBudget} form={formBudget}>
        <Form.Item name="budget" label="Monthly budget">
          <Input type="number" />
        </Form.Item>
        <div className="flex justify-end mt-6">
          <Button type="primary" htmlType="submit" className="">
            Update Budget
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BudgetUpdateForm;
