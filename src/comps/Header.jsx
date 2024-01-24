import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"
import { AppContext } from '../App';
import { useContext } from "react";

const Header = () => {
  const { userName } = useContext(AppContext)

  return (
    <>
     {userName && userName 
     ? <header>
        <Link to="/mainpage/"><h1><TbHeartQuestion /> Fancy-quiz.me</h1></Link>
        <Link to={'/userPage/' + userName.name}>{userName.name}</Link>
      </header> 
    : <header>
        <Link to="/"><h1><TbHeartQuestion /> Fancy-quiz.me</h1></Link>
        <Link to="/login/" >Log In</Link>
      </header>}
    <Outlet />
    </>
  )
}

export default Header