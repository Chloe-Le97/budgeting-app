import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Typography,
} from 'antd';
import { useMemo, useState } from 'react';

import AssetForm from './AssetForm';
import {
  useCreateAssetMutation,
  useGetAsset,
  useRemoveAssetMutation,
  useUpdateAssetMutation,
} from './assetDataProvider';

const Assets = () => {
  const [editForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEditing = (record) => record.key === editingKey;

  const { data, isLoading } = useGetAsset();
  const { createAsset } = useCreateAssetMutation();
  const { updateAsset } = useUpdateAssetMutation();
  const { removeAsset } = useRemoveAssetMutation();

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
            {(dataIndex = inputNode)}
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
      total_money: '',
      name: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (value) => {
    const formValue = editForm.getFieldValue();
    console.log(formValue);
    console.log(value);
    const newObject = {
      name: formValue.name,
      differentValue: formValue.total_money - value.total_money,
    };
    await updateAsset({ id: formValue.key, data: newObject });
    setEditingKey('');
  };

  const delAsset = async (id) => {
    await removeAsset({ id });
  };

  const dataTable = useMemo(
    () =>
      data?.map((item) => ({
        key: item.asset_id,
        total_money: item.total_money,
        name: item.name,
      })),
    [data],
  );

  const columns = [
    {
      title: 'Asset',
      dataIndex: 'name',
      editable: true,
    },

    {
      title: 'Value',
      dataIndex: 'total_money',
      width: '30%',
      editable: true,
      render: (value) => {
        return <div>{value} €</div>;
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      width: '5%',
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
    {
      title: 'Delete',
      dataIndex: 'delete',
      width: '5%',
      render: (_, value) => {
        return (
          <Popconfirm
            title="Delete the expense"
            description="Are you sure to delete this expense?"
            onConfirm={() => delAsset(value.key)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
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
        inputType: col.dataIndex === 'total_money' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(value),
      }),
    };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
          pagination={false}
        />
      </Form>
      <Button type="primary" onClick={showModal} className="modal-button">
        +
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <AssetForm />
      </Modal>
    </div>
  );
};

export default Assets;
