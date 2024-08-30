import service from './helper'

const url = 'api/income'


const createIncome = async(newObject) =>{
  const response = await service.create(url, newObject)
 
  return response
 }


export default { createIncome }

