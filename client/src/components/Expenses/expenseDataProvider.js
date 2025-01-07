import expenseService from '../../services/expenses'
import incomeService from '../../services/income'
import transferService from '../../services/transfer'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {assetQueryKey} from '../Assets/assetDataProvider'
import {billQueryKey} from '../Bill/billDataProvider'
export const expenseQueryKey = 'expenses'

export const useGetExpense = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [expenseQueryKey],
        queryFn: () => expenseService.getAllExpense()
    })
    return {data, isLoading}
}

export const useCreateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createExpense, isPending} =  useMutation({
        mutationFn: expenseService.createExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            queryClient.invalidateQueries({ queryKey: [billQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createExpense, isPending}
}

export const useCreateIncomeMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createIncome, isPending} =  useMutation({
        mutationFn: incomeService.createIncome,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            queryClient.invalidateQueries({ queryKey: [billQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createIncome, isPending}
} 

export const useUpdateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateExpense, isPending} =  useMutation({
        mutationFn: ({id, data}) => expenseService.updateExpense(id,data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            queryClient.invalidateQueries({ queryKey: [billQueryKey] })
        }
      })
      return {updateExpense, isPending}
} 

export const useRemoveExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:removeExpense, isPending} =  useMutation({
        mutationFn: ({id}) => expenseService.removeExpense(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            queryClient.invalidateQueries({ queryKey: [billQueryKey] })
        }
      })
      return {removeExpense, isPending}
} 

export const useCreateTransferMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createTransfer, isPending} =  useMutation({
        mutationFn: transferService.transferMoney,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createTransfer, isPending}
} 