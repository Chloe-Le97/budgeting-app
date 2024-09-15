import service from './helper'
const url = 'api/budget'

const getAllBudget = async() => {
  const response = await service.getAll(url)
  return response
}

const createBudget = async(newObject) =>{
 const response = await service.create(url, newObject)

 return response
}

const updateBudget = async(newObject) =>{
  const response = await service.updateUser(url, newObject)
  
  return response
}


export default { getAllBudget, createBudget, updateBudget }