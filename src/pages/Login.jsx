import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from '../App';

const Login = () => {
  const { setUserName } = useContext(AppContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({name:'', email:''})

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({...prevUser,[name]: value}))
  }

  const handleLogin = async () => {
    try {
      const resp = await fetch('http://localhost:4400/Users?name=' + user.name + '&email=' + user.email)
  
    if (resp.ok) {
      const user = await resp.json()

      user && user.length > 0
      ? (
        setUserName(user[0].name, user[0].id),
        navigate('/mainpage/'),
        localStorage.setItem('user', JSON.stringify({ name: user[0].name, id: user[0].id })))
      : alert('User not found')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <div className="newUser">
        <form action="" onSubmit={handleSubmit} >
            <h1>Welcome back,<br/>remind us your name</h1>
            <label>
                User:<br />
                <input name="name" type="text" placeholder="Input your username here..." onInput={handleInput} required />
            </label>
            <label>
                email:<br />
                <input name="email" type="email" placeholder="Input your email here..."  onInput={handleInput} required />
            </label>
            <label>
                password:<br />
                <input type="password" placeholder="Input your password here..." required />
            </label>
            <button type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login