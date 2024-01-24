import { Link, useNavigate  } from "react-router-dom"
import { AppContext } from '../App';
import { useContext } from "react";

const UserPage = () => {
    const { setUserName } = useContext(AppContext)
    const navigate = useNavigate()
    
    const handleClick = () => {
      localStorage.setItem('user', '')  
      setUserName('')
      navigate('/')
    }

  return (
    <>
    <Link to={'/createquiz'} >Create Your Own Quiz</Link>
    <button onClick={handleClick} >Log Out</button>
    </>
  )
}

export default UserPage