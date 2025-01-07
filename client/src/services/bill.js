import service from './helper'
const url = 'api/bill'

const getAllBill = async() => {
  const response = await service.getAll(url)
  return response
}



export default { getAllBill }