import { useContext, useState } from "react"
import uuid from 'react-uuid';
import { AppContext } from '../App';

const Register = () => {
  const { setUserName } = useContext(AppContext)
  const [newUser, setNewUser] = useState({id:uuid(), name:'', age:''})
  const postUser = async () => {
    try {
      const resp = await fetch('http://localhost:4400/Users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      if(resp.ok) {setUserName(newUser)}
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setNewUser((prevUser) => ({...prevUser,[name]: value}))
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
                Age:<br />
                <input name="age" type="Number" placeholder="Input your age here..."  onInput={handleInput} />
            </label>
            <button type="submit">Create user</button>
        </form>

    </div>
  )
}

export default Register