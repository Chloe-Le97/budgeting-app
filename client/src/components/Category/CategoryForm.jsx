import { Button, Form, Input, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

import { iconObject } from '../../utils/iconMapping';
import { useCreateCategoryMutation } from './categoryDataProvider';

const CategoryForm = ({ handleOk }) => {
  const { createCategory } = useCreateCategoryMutation();
  const [formCreateCategory] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState('');

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

  const addCategory = async () => {
    const formValue = formCreateCategory.getFieldValue();
    const newObject = {
      icon: formValue.icon,
      name: formValue.name,
      type: formValue.type,
    };
    console.log(newObject);
    await createCategory(newObject);
    formCreateCategory.resetFields();
    setSelectedIcon('');
    handleOk();
  };

  const handleIconChange = ({ target: { value } }) => {
    setSelectedIcon(value);
  };

  return (
    <div>
      <Form name="basic" onFinish={addCategory} form={formCreateCategory}>
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
            Add category
          </Button>
        </div>
      </Form>
    </div>
  );
};

CategoryForm.propTypes = {
  handleOk: PropTypes.func,
};

CategoryForm.defaultProps = {
  handleOk: () => {},
};

export default CategoryForm;
