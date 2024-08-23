import React from 'react';
import { useGetExpense, useCreateExpenseMutation } from './expenseDataProvider'
import { useGetAsset } from '../Assets/assetDataProvider';
import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;



const Expenses = ({user}) => {
    const [form] = Form.useForm();

    const {data, isLoading} = useGetExpense()
    const {data: dataAsset, isLoadingAsset} = useGetAsset()

    const {createExpense} = useCreateExpenseMutation()

    console.log(dataAsset)

    const options = dataAsset?.map(asset => ({value:asset.id,label:asset.name}))

    const addExpense = async (values) => {
        const money = values.money
        const text = values.text
        const category = values.category
        const assetId = values.asset
        console.log(values.asset)
        createExpense({money,text,category,assetId})
        form.resetFields();
    }


    return (
        <div>
            <h1>Expenses</h1>
            {data?.map(expense => (
                <div key={expense.id}>
                    {expense.text} {expense.money}€
                </div>
            ))}
            <Form name="basic" onFinish={addExpense} form={form}>
                <Form.Item name="money" label="Value">
                    <Input />
                </Form.Item>
                <Form.Item name="text" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="Category">
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
                    // onChange={onAssetChange}
                    options={options}
                    allowClear
                    >
                        {/* {dataAsset.map(asset =>
                            <Option key={asset.id} value={asset.id}>{asset.name}</Option>
                        )} */}
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">Add expense</Button>
            </Form>
        </div>
    )
}

export default Expenses