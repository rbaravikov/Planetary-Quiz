import { Link, Outlet } from "react-router-dom"
import { AppContext } from '../App';
import { useContext } from "react";
import React from 'react';
import Logo from '../images/logo-removedbg.svg';


const Header = () => {
  const { userName } = useContext(AppContext)
  const handleClick = () => {
    localStorage.setItem('user', '')  
    setUserName('')
    navigate('/')
  }

  return (
    <>
    <header>
      <Link to="/mainpage/"><h1><img src={Logo} alt="Fancy-quiz.me" /> Fancy-quiz.me</h1></Link>
        {userName && userName
        ? <div className="headerNav">
          <Link className="createQuiz" to={'/createquiz'} >Create Quiz</Link>
          <Link to={'/userPage/' + userName.name}>{userName.name}</Link>
          <Link to="/" onClick={handleClick} >Log Out</Link>
        </div>
        : <div className="headerNav">
          <Link to="/login/" >Log In</Link>
        </div>}
    </header>
    
    <Outlet />
    </>
  )
}

export default Header