import axios from 'axios'
const baseUrl = 'http://192.168.0.115:3001/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }