import expenseService from '../../services/expenses'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const queryKey = 'expenses'

export const useGetExpense = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [queryKey],
        queryFn: () => expenseService.getAll()
    })
    return {data, isLoading}
}

export const useCreateExpenseMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createExpense} =  useMutation({
        mutationFn: expenseService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createExpense}
} 
