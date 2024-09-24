import { useEffect, useState } from 'react';
import LoginForm from './components/AuthForm/LoginForm';
import { useAuth } from './components/AuthProvider/AuthProvider';
import Expenses from './components/Expenses/Expenses';
import Notification from './components/Notification/Notification';
import service from './services/helper';

function App() {
  const { authToken, setAuthToken, setCurrentUser } = useAuth();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBugettingappUser',
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser(user);
      setAuthToken(user.token);
      service.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification message={message} />
      <div>{authToken ? <Expenses /> : <LoginForm />}</div>
    </>
  );
}

export default App;
