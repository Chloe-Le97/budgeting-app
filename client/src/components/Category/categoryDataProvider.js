import categoryService from '../../services/category'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const categoryQueryKey = 'category'

export const useGetCategory = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [categoryQueryKey],
        queryFn: () => categoryService.getAllCategory()
    })
    return {data, isLoading}
}

export const useCreateCategoryMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createCategory, isPending} =  useMutation({
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [categoryQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createCategory, isPending}
}

export const useUpdateCategoryMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateCategory, isPending} =  useMutation({
        mutationFn: ({id, data}) => categoryService.updateCategory(id,data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [categoryQueryKey] })
        }
      })
      return {updateCategory, isPending}
} 

export const useRemoveCategoryMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:removeCategory, isPending} =  useMutation({
        mutationFn: ({id}) => categoryService.removeCategory(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [categoryQueryKey] })
        }
      })
      return {removeCategory, isPending}
} 