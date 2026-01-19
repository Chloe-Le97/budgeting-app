import axios from 'axios'
import config from '../config'

const baseUrl = `${config.apiUrl}/api/users`

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { signup }