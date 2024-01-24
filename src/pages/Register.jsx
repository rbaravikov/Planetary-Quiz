import { useContext, useState } from "react"
import { AppContext } from '../App';
import uuid from "react-uuid";

const Register = () => {
  const { setUserName } = useContext(AppContext)
  const [User, setUser] = useState(() => ({ name: '', email: '', id: uuid() }));

  const postUser = async () => {
    try {
      const resp = await fetch('http://localhost:4400/Users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
      })
        
      if(resp.ok) {
        localStorage.setItem('user', JSON.stringify({ name: User.name, id: User.id }));
        setUserName(User.name)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({...prevUser,[name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postUser()
  }

  return (
    <div className="newUser">
        <form action="" onSubmit={handleSubmit} >
            <h1>Register your name</h1>
            <label>
                User:<br />
                <input name="name" type="text" placeholder="Input your username here..." onInput={handleInput} />
            </label>
            <label>
                email:<br />
                <input name="email" type="email" placeholder="Input your email here..."  onInput={handleInput} />
            </label>
            <button type="submit">Create user</button>
        </form>

    </div>
  )
}

export default Register