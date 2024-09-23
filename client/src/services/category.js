import service from './helper'
const url = 'api/category'

const getAllCategory = async() => {
  const response = await service.getAll(url)
  return response
}

const createCategory = async(newObject) =>{
 const response = await service.create(url, newObject)

 return response
}

const updateCategory = async(id,newObject) =>{
  const response = await service.update(url,id,newObject)
  
  return response
}

const removeCategory = async(id) =>{
 const response = await service.remove(url,id)

 return response
}


export default { getAllCategory, createCategory, updateCategory, removeCategory }