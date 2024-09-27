import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import { useGetAsset } from '../Assets/assetDataProvider';
import { useCreateTransferMutation } from './expenseDataProvider';

const TransferForm = ({ handleOk }) => {
  const [formTransfer] = Form.useForm();

  const { data: dataAsset } = useGetAsset();
  const { createTransfer } = useCreateTransferMutation();

  const options = dataAsset?.map((asset) => ({
    value: asset.asset_id,
    label: asset.name,
  }));

  const addTransfer = async (values) => {
    const value = values.money;
    const transferFromAsset = values.fromAsset;
    const transferToAsset = values.toAsset;
    await createTransfer({ value, transferFromAsset, transferToAsset });
    formTransfer.resetFields();
    handleOk();
  };

  return (
    <div>
      <Form
        name="income-form"
        onFinish={addTransfer}
        form={formTransfer}
        className="pt-8"
      >
        <Form.Item
          name="fromAsset"
          label="From Asset"
          rules={[
            {
              required: true,
              message: 'Please select a From Asset',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('toAsset') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('From Asset and To Asset cannot be the same'),
                );
              },
            }),
          ]}
        >
          <Select
            placeholder="From asset"
            options={options}
            allowClear
          ></Select>
        </Form.Item>
        <Form.Item
          name="toAsset"
          label="To Asset"
          rules={[
            {
              required: true,
              message: 'Please select a To Asset',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('fromAsset') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('From Asset and To Asset cannot be the same'),
                );
              },
            }),
          ]}
        >
          <Select placeholder="To asset" options={options} allowClear></Select>
        </Form.Item>
        <Form.Item
          name="money"
          label="Value"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <div className="flex justify-end mt-9">
          <Button type="primary" htmlType="submit">
            Transfer
          </Button>
        </div>
      </Form>
    </div>
  );
};

TransferForm.propTypes = {
  handleOk: PropTypes.func,
};

TransferForm.defaultProps = {
  handleOk: () => {},
};

export default TransferForm;
