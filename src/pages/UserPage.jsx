import { useNavigate  } from "react-router-dom"
import { AppContext } from '../App';
import { useContext } from "react";

const UserPage = () => {
    const { setUserName } = useContext(AppContext)
    const navigate = useNavigate()
    
    const handleClick = () => {
        setUserName('')
        navigate('/')
    }

  return (
    <button onClick={handleClick} >Log Out</button>
  )
}

export default UserPage