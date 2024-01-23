import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({name:'', age:''})

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({...prevUser,[name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/mainpage/')
  }

  return (
    <div className="newUser">
        <form action="" onSubmit={handleSubmit} >
            <h1>Welcome back, remind us your name</h1>
            <label>
                User:<br />
                <input name="name" type="text" placeholder="Input your username here..." onInput={handleInput} />
            </label>
            <label>
                Age:<br />
                <input name="age" type="Number" placeholder="Input your age here..."  onInput={handleInput} />
            </label>
            <button type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login