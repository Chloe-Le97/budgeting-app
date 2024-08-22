import {useState, useEffect} from 'react'
import expenseService from '../../services/expenses'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useGetExpense, useCreateExpenseMutation } from './expenseDataProvider'

const Expenses = ({user}) => {


    const {data, isLoading} = useGetExpense()
    const {createExpense} = useCreateExpenseMutation()

    console.log('expense data:',data)

    const addExpense = async (event) => {
        event.preventDefault()
        const money = event.target.money.value
        event.target.money.value = ''
        const text = event.target.text.value
        event.target.text.value = ''
        const category = event.target.category.value
        event.target.category.value = ''
        createExpense({money,text,category,assetId:2})
      }


    


    return (
        <div>
            <h1>Expenses</h1>
            {data?.map(expense => (
                <div key={expense.id}>
                    {expense.text} {expense.money}€
                </div>
            ))}
            <form onSubmit={addExpense}>
                <div>
                Value<input name="money" type="number"></input>
                </div>
                <div>Description <input name="text" type="text"></input></div>
                <div>Category<input name="category" type="category"></input></div>
                <button type='submit'>Add expense</button>
            </form>
        </div>
    )
}

export default Expenses