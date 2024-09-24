import { Tabs, Typography } from 'antd';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import CategoryForm from './CategoryForm';
import SubCategory from './SubCategory';

const Category = () => {
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tabItems = [
    {
      key: '1',
      label: 'Expense',
      children: <SubCategory type="Expenses" />,
    },
    {
      key: '2',
      label: 'Income',
      children: <SubCategory type="Income" />,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Title level={3}>Categories</Title>
        <Button
          type="primary"
          onClick={showModal}
          className="category-modal-button"
        >
          +
        </Button>
      </div>

      <Tabs defaultActiveKey="1" items={tabItems} className="category-tabs" />

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <CategoryForm handleOk={handleOk} />
      </Modal>
    </div>
  );
};

export default Category;
