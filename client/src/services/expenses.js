import axios from 'axios'
const baseUrl = 'http://192.168.0.115:3001/api/expenses'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update =  async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

export default { getAll, create, update, setToken }