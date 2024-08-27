import expenseService from '../../services/expenses'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {assetQueryKey} from '../Assets/assetDataProvider'

const expenseQueryKey = 'expenses'

export const useGetExpense = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [expenseQueryKey],
        queryFn: () => expenseService.getAll()
    })
    return {data, isLoading}
}

export const useCreateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createExpense} =  useMutation({
        mutationFn: expenseService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createExpense}
} 

export const useUpdateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateExpense} =  useMutation({
        mutationFn: ({id, data}) => expenseService.update(id,data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
        }
      })
      return {updateExpense}
} 

export const useRemoveExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:removeExpense} =  useMutation({
        mutationFn: ({id}) => expenseService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
        }
      })
      return {removeExpense}
} 
