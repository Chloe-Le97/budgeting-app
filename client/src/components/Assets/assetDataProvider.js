import assetService from '../../services/assets'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {expenseQueryKey} from '../Expenses/expenseDataProvider'

export const assetQueryKey = 'assets'

export const useGetAsset = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [assetQueryKey],
        queryFn: () => assetService.getAll()
    })
    return {data, isLoading}
}

export const useCreateAssetMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:createAsset, isLoading : isMutating} =  useMutation({
        mutationFn: assetService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createAsset, isMutating}
} 

export const useUpdateAssetMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:updateAsset, isLoading} =  useMutation({
        mutationFn: ({id, data}) => assetService.update(id,data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
        }
      })
      return {updateAsset, isLoading}
} 

export const useRemoveAssetMutation = () =>{
    const queryClient = useQueryClient()
    const {mutateAsync:removeAsset, isLoading} =  useMutation({
        mutationFn: ({id}) => assetService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [expenseQueryKey] })
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
        }
      })
      return {removeAsset, isLoading}
} 
