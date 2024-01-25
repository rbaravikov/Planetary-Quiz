import { Link, Outlet } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"
import { AppContext } from '../App';
import { useContext } from "react";

const Header = () => {
  const { userName } = useContext(AppContext)
  const handleClick = () => {
    localStorage.setItem('user', '')  
    setUserName('')
    navigate('/')
  }

  return (
    <>
     {userName && userName 
     ? <header>
        <Link to="/mainpage/"><h1><TbHeartQuestion /> Fancy-quiz.me</h1></Link>
        <div className="headerNav">
          <Link className="createQuiz" to={'/createquiz'} >Create Quiz</Link>
          <Link to={'/userPage/' + userName.name}>{userName.name}</Link>
          <Link to="/" onClick={handleClick} >Log Out</Link>
        </div>
      </header> 
    : <header>
        <Link to="/"><h1><TbHeartQuestion /> Fancy-quiz.me</h1></Link>
        <div className="headerNav">
          <Link to="/login/" >Log In</Link>
        </div>
      </header>}
    <Outlet />
    </>
  )
}

export default Header