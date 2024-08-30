import expenseService from '../../services/expenses'
import incomeService from '../../services/income'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {assetQueryKey} from '../Assets/assetDataProvider'

export const expenseQueryKey = 'expenses'

export const useGetExpense = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [expenseQueryKey],
        queryFn: () => expenseService.getAll()
    })
    return {data, isLoading}
}

export const useCreateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createExpense, isPending} =  useMutation({
        mutationFn: expenseService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createExpense, isPending}
}

export const useCreateIncomeMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createIncome, isPending} =  useMutation({
        mutationFn: incomeService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createIncome, isPending}
} 

export const useUpdateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateExpense, isPending} =  useMutation({
        mutationFn: ({id, data}) => expenseService.update(id,data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
        }
      })
      return {updateExpense, isPending}
} 

export const useRemoveExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:removeExpense, isPending} =  useMutation({
        mutationFn: ({id}) => expenseService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
        }
      })
      return {removeExpense, isPending}
} 
