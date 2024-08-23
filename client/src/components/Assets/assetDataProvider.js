import assetService from '../../services/assets'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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
    const {mutateAsync:createAsset} =  useMutation({
        mutationFn: assetService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [assetQueryKey] })
            // queryClient.setQueryData({queryKey},(oldData) => oldData?.concat(expense))
        }
      })
      return {createAsset}
} 
