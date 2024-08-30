import service from './helper'
const url = 'api/assets'

const getAllAsset = async() => {
  const response = await service.getAll(url)

  return response
}

const createAsset = async(newObject) =>{
 const response = await service.create(url, newObject)

 return response
}

const updateAsset = async(id,newObject) =>{
  const response = await service.update(url,id,newObject)
  
  return response
}

const removeAsset = async(id) =>{
 const response = await service.remove(url,id)

 return response
}


export default { getAllAsset, createAsset, updateAsset, removeAsset }