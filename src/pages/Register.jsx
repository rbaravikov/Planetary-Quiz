import { useContext, useState } from "react"
import { AppContext } from '../App';
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setUserName } = useContext(AppContext)
  const [user, setUser] = useState(() => ({ name: '', email: '', id: uuid() }));
  const navigate = useNavigate()

  const isNewUser = async () => {

      const resp = await fetch(`http://localhost:4400/Users?name=${user.name}&email=${user.email}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        data.length === 0 ? postUser() : alert("This User is taken")
      }
  }

  const postUser = async () => {    
    try {
      const resp = await fetch('http://localhost:4400/Users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        
      if(resp.ok) {
        localStorage.setItem('user', JSON.stringify({ name: user.name, id: user.id }));
        setUserName(user.name)
        navigate('/mainpage/')
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
    // postUser()
    isNewUser()
  }

  return (
    <div className="newUser">
        <form action="" onSubmit={handleSubmit} >
            <h1>Register your name</h1>
            <label>
                User:<br />
                <input value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} type="text" placeholder="Input your username here..." required />
            </label>
            <label>
                email:<br />
                <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} type="email" placeholder="Input your email here..."  required />
            </label>
            <button type="submit">Create user</button>
        </form>

    </div>
  )
}

export default Register