import { Button, Form, Input } from 'antd';

import { useCreateAssetMutation } from './assetDataProvider';

const AssetForm = ({ handleOk }) => {
  const [form] = Form.useForm();

  const { createAsset } = useCreateAssetMutation();

  const addAsset = async (values) => {
    const name = values.name;
    const value = values.value;
    await createAsset({ name, value });
    form.resetFields();
    handleOk();
  };

  return (
    <Form name="basic" onFinish={addAsset} form={form} className="pt-8">
      <Form.Item name="name" label="Asset name">
        <Input />
      </Form.Item>
      <Form.Item name="value" label="Asset value">
        <Input />
      </Form.Item>
      <div className="flex justify-end mt-9">
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </div>
    </Form>
  );
};

export default AssetForm;
