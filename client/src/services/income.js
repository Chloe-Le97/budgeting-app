import axios from 'axios'
const baseUrl = 'http://192.168.0.115:3001/api/income'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


export default { create, setToken }