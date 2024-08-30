import service from './helper'
const url = 'api/expenses'

const getAllExpense = async() => {
  const response = await service.getAll(url)

  return response
}

const createExpense = async(newObject) =>{
 const response = await service.create(url, newObject)

 return response
}

const updateExpense = async(id,newObject) =>{
  const response = await service.update(url,id,newObject)
  
  return response
}

const removeExpense = async(id) =>{
 const response = await service.remove(url,id)

 return response
}


export default { getAllExpense, createExpense, updateExpense, removeExpense }