import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Modal, Popconfirm, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { iconObject } from '../../utils/iconMapping';
import {
  useGetCategory,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from './categoryDataProvider';

const SubCategory = ({ type }) => {
  const { data: dataCategory } = useGetCategory();
  const [formEditCategory] = Form.useForm();
  const { removeCategory } = useRemoveCategoryMutation();
  const { updateCategory } = useUpdateCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditCategory, setCurrentEditCategory] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('');

  const categories = dataCategory
    ?.filter((item) => item.type === type)
    .sort((a, b) => a.id - b.id);

  const categoryTypeOptions = [
    {
      value: 'Income',
      label: 'Income',
    },
    {
      value: 'Expenses',
      label: 'Expenses',
    },
  ];
  const iconOptions = Object.entries(iconObject).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const delCategory = async (id) => {
    await removeCategory({ id });
  };

  const showModal = (category) => {
    setIsModalOpen(true);
    setCurrentEditCategory(category);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCurrentEditCategory(null);
    formEditCategory.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentEditCategory(null);
    formEditCategory.resetFields();
  };

  const editCategory = async () => {
    const formValue = formEditCategory.getFieldValue();
    const newObject = {
      icon: formValue.icon,
      name: formValue.name,
      type: formValue.type,
    };
    await updateCategory({ id: formValue.id, data: newObject });
    setCurrentEditCategory(null);
    formEditCategory.resetFields();
    handleOk();
  };

  useEffect(() => {
    if (currentEditCategory) {
      formEditCategory.setFieldsValue(currentEditCategory);
      setSelectedIcon(currentEditCategory.icon);
    }
  }, [currentEditCategory, formEditCategory]);

  const handleIconChange = ({ target: { value } }) => {
    setSelectedIcon(value);
  };

  return (
    <div>
      {categories?.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between border-b border-gray-300 py-3"
        >
          <div className="inline-flex items-center">
            <div className="category-icon">{iconObject[category.icon]}</div>
            <div>{category.name}</div>
          </div>
          <div>
            <Button
              type="link"
              className="category-edit-icon"
              onClick={() => showModal(category)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Popconfirm
              title="Delete the expense"
              description="Are you sure to delete this category?"
              onConfirm={() => delCategory(category.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" className="category-delete-icon">
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Popconfirm>
          </div>
        </div>
      ))}
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form name="basic" onFinish={editCategory} form={formEditCategory}>
          <div className="mb-6 flex items-center justify-center category-selected-icon">
            {selectedIcon && (
              <div className="text-3xl">{iconObject[selectedIcon]}</div>
            )}
          </div>
          <Form.Item name="type" label="Type">
            <Select
              placeholder="Select a type"
              options={categoryTypeOptions}
              allowClear
            ></Select>
          </Form.Item>
          <Form.Item name="name" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="" className="mt-5">
            <Radio.Group
              className="category-form-edit-icon-btn category-edit-icon-btn"
              options={iconOptions}
              onChange={handleIconChange}
              allowClear
              optionType="button"
              size="large"
            />
          </Form.Item>
          <div className="flex justify-end mt-9">
            <Button type="primary" htmlType="submit" className="">
              Edit category
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

SubCategory.propTypes = {
  type: PropTypes.string.isRequired,
};

SubCategory.defaultProps = {
  type: 'Expenses',
};

export default SubCategory;
