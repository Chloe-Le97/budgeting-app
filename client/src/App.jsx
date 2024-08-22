import { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/users'
import expenseService from './services/expenses'
import Notification from './components/Notification/Notification'
import Expenses from './components/Expenses/Expenses'

function App() {
  const [username, setUsername] = useState('') 
  const [name, setName] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBugettingappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      expenseService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async(event) =>{
    event.preventDefault()

    try{
      const user = await loginService.login({
        username,password
      })

      window.localStorage.setItem(
        'loggedBugettingappUser', JSON.stringify(user)
      ) 
      setUser(user)
      expenseService.setToken(user.token)
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage('Wrong credentials')
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }
  }

  const handleSignUp = async(event) =>{
    event.preventDefault()

    try{
      await userService.signup({
        username,name,password
      })
      setUsername('')
      setPassword('')
      setMessage('Sign up successfully, please log in')
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }catch(exception){
      setMessage('Something wrong')
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }
  }

  const signUpForm = () => (
    <form onSubmit={handleSignUp}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        name
          <input
          type="text"
          value={name}
          name="Username"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">sign up</button>
    </form>      
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
    )

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          {loginForm()}
          {signUpForm()}
        </div>
      ) :
      (
      <div>
        Welcome to budgeting
        <Expenses user={user} />
      </div>
      )}
    </div>
  )
}

export default App
