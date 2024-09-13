import service from './helper'

const url = 'api/transfer'


const transferMoney = async(newObject) =>{
  const response = await service.create(url, newObject)
  return response
}

export default { transferMoney }

