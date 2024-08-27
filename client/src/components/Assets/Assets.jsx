import { Button, Form, Input } from 'antd';
import React from 'react';

import { useCreateAssetMutation, useGetAsset } from './assetDataProvider';

const Assets = ({ user }) => {
  const assetFormRef = React.useRef(null);

  const { data, isLoading } = useGetAsset();
  const { createAsset } = useCreateAssetMutation();

  const addAsset = async (values) => {
    const name = values.name;
    const value = values.value;
    createAsset({ name, value });
    assetFormRef.current.resetFields();
  };

  return (
    <div>
      <h1>Assets</h1>
      {data?.map((asset) => (
        <div key={asset.asset_id}>
          {asset.name} {asset.total_money}€
        </div>
      ))}
      <Form name="basic" onFinish={addAsset} ref={assetFormRef}>
        <Form.Item name="name" label="Asset name">
          <Input />
        </Form.Item>
        <Form.Item name="value" label="Asset value">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form>
    </div>
  );
};

export default Assets;
