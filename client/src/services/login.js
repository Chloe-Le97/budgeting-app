import axios from 'axios'
import config from '../config'

const baseUrl = `${config.apiUrl}/api/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }