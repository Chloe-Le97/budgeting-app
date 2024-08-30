import axios from 'axios'
const baseUrl = 'http://192.168.0.115:3001/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async(url) => {
  const config = {
    headers: { Authorization: token },
  }

  const requestUrl = baseUrl + url

  const response = await axios.get(requestUrl, config)

  return response.data
}


const create = async (url, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const requestUrl = baseUrl + url

  const response = await axios.post(requestUrl, newObject, config)
  return response.data
}

const update =  async (url,id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const requestUrl = baseUrl + url

  const response = await axios.put(`${ requestUrl }/${id}`, newObject, config)
  return response.data
}

const remove =  async (url, id) => {
  const config = {
    headers: { Authorization: token },
  }

  const requestUrl = baseUrl + url

  const response = await axios.delete(`${ requestUrl }/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, remove }