import budgetService from '../../services/budget'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const budgetQueryKey = 'budget'

export const useGetBudget = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [budgetQueryKey],
        queryFn: () => budgetService.getAllBudget()
    })
    return {data, isLoading}
}

export const useCreateBudgetMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createBudget, isPending} =  useMutation({
        mutationFn: budgetService.createBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [budgetQueryKey] })
        }
      })
      return {createBudget, isPending}
}

export const useUpdateBudgetMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateBudget, isPending} =  useMutation({
        mutationFn: budgetService.updateBudget,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [budgetQueryKey] })
        }
      })
      return {updateBudget, isPending}
} 