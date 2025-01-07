import billService from '../../services/bill'
import { useQuery} from '@tanstack/react-query'

export const billQueryKey = 'bill'

export const useGetBill = () =>{
    const {data, isLoading} = useQuery({
        queryKey: [billQueryKey],
        queryFn: () => billService.getAllBill()
    })
    return {data, isLoading}
}
